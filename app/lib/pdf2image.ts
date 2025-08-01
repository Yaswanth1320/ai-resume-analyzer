import type {
  PDFDocumentProxy,
  PDFPageProxy,
  PageViewport,
  RenderTask,
} from "pdfjs-dist";

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

// Type definitions for PDF.js parameters
interface DocumentInitParameters {
  data?: Uint8Array;
  useSystemFonts?: boolean;
  disableFontFace?: boolean;
  useWorkerFetch?: boolean;
  useWasm?: boolean;
}

interface GetViewportParameters {
  scale: number;
  rotation?: number;
}

interface RenderParameters {
  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement | null;
  viewport: PageViewport;
  intent?: string;
  background?: string;
}

// Global variables for PDF.js library management
let pdfjsLib: typeof import("pdfjs-dist") | null = null;
let isLoading = false;
let loadPromise: Promise<typeof import("pdfjs-dist")> | null = null;

/**
 * Loads the PDF.js library with proper worker configuration
 */
async function loadPdfJs(): Promise<typeof import("pdfjs-dist")> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  loadPromise = import("pdfjs-dist").then((lib) => {
    // Configure the worker source
    lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    // Log version for debugging
    console.log(`PDF.js Library Version: ${lib.version}`);

    pdfjsLib = lib;
    isLoading = false;
    return lib;
  });

  return loadPromise;
}

/**
 * Converts a PDF file to an image (PNG format)
 * @param file - The PDF file to convert
 * @param options - Optional conversion parameters
 * @returns Promise<PdfConversionResult> - The conversion result with image URL and file
 */
export async function convertPdfToImage(
  file: File,
  options: {
    scale?: number;
    pageNumber?: number;
    quality?: number;
  } = {}
): Promise<PdfConversionResult> {
  const { scale = 2.0, pageNumber = 1, quality = 1.0 } = options;

  try {
    // Load PDF.js library
    const lib = await loadPdfJs();

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Create document loading parameters
    const loadingParams: DocumentInitParameters = {
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
      disableFontFace: false,
      useWorkerFetch: true,
      useWasm: true,
    };

    // Load the PDF document
    const loadingTask = lib.getDocument(loadingParams);
    const pdfDocument: PDFDocumentProxy = await loadingTask.promise;

    // Validate page number
    const numPages = pdfDocument.numPages;
    if (pageNumber < 1 || pageNumber > numPages) {
      await pdfDocument.destroy();
      return {
        imageUrl: "",
        file: null,
        error: `Invalid page number: ${pageNumber}. Document has ${numPages} pages.`,
      };
    }

    // Get the specified page (1-indexed to 0-indexed)
    const page: PDFPageProxy = await pdfDocument.getPage(pageNumber);

    // Create viewport with specified scale
    const viewportParams: GetViewportParameters = {
      scale: scale,
      rotation: 0,
    };
    const viewport: PageViewport = page.getViewport(viewportParams);

    // Create canvas for rendering
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      await pdfDocument.destroy();
      return {
        imageUrl: "",
        file: null,
        error: "Failed to get canvas context",
      };
    }

    // Set canvas dimensions
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Configure rendering context for high quality
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    // Set white background
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render parameters
    const renderParams: RenderParameters = {
      canvasContext: context,
      canvas: canvas,
      viewport: viewport,
      intent: "display",
      background: "#ffffff",
    };

    // Render the page
    const renderTask: RenderTask = page.render(renderParams);
    await renderTask.promise;

    // Convert canvas to blob
    return new Promise<PdfConversionResult>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a File from the blob with the same name as the PDF
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File(
              [blob],
              `${originalName}_page_${pageNumber}.png`,
              {
                type: "image/png",
              }
            );

            // Create object URL for the image
            const imageUrl = URL.createObjectURL(blob);

            // Clean up resources
            pdfDocument.destroy().catch(() => {
              // Ignore cleanup errors
            });

            resolve({
              imageUrl,
              file: imageFile,
            });
          } else {
            pdfDocument.destroy().catch(() => {
              // Ignore cleanup errors
            });
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        quality
      );
    });
  } catch (error) {
    // Clean up any resources if available
    if (pdfjsLib) {
      try {
        // Try to destroy any existing document
        // This is a best-effort cleanup
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${errorMessage}`,
    };
  }
}

/**
 * Converts multiple pages of a PDF to images
 * @param file - The PDF file to convert
 * @param options - Optional conversion parameters
 * @returns Promise<PdfConversionResult[]> - Array of conversion results
 */
export async function convertPdfToMultipleImages(
  file: File,
  options: {
    scale?: number;
    quality?: number;
    startPage?: number;
    endPage?: number;
  } = {}
): Promise<PdfConversionResult[]> {
  const { scale = 2.0, quality = 1.0, startPage = 1, endPage } = options;

  try {
    const lib = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();

    const loadingParams: DocumentInitParameters = {
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
      disableFontFace: false,
      useWorkerFetch: true,
      useWasm: true,
    };

    const loadingTask = lib.getDocument(loadingParams);
    const pdfDocument: PDFDocumentProxy = await loadingTask.promise;

    const numPages = pdfDocument.numPages;
    const actualEndPage = endPage ? Math.min(endPage, numPages) : numPages;
    const actualStartPage = Math.max(1, startPage);

    if (actualStartPage > actualEndPage) {
      await pdfDocument.destroy();
      return [
        {
          imageUrl: "",
          file: null,
          error: "Start page is greater than end page",
        },
      ];
    }

    const results: PdfConversionResult[] = [];

    for (let pageNum = actualStartPage; pageNum <= actualEndPage; pageNum++) {
      try {
        const page: PDFPageProxy = await pdfDocument.getPage(pageNum);
        const viewport: PageViewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          results.push({
            imageUrl: "",
            file: null,
            error: `Failed to get canvas context for page ${pageNum}`,
          });
          continue;
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderTask: RenderTask = page.render({
          canvasContext: context,
          canvas: canvas,
          viewport: viewport,
          intent: "display",
          background: "#ffffff",
        });

        await renderTask.promise;

        const result = await new Promise<PdfConversionResult>((resolve) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const originalName = file.name.replace(/\.pdf$/i, "");
                const imageFile = new File(
                  [blob],
                  `${originalName}_page_${pageNum}.png`,
                  {
                    type: "image/png",
                  }
                );

                resolve({
                  imageUrl: URL.createObjectURL(blob),
                  file: imageFile,
                });
              } else {
                resolve({
                  imageUrl: "",
                  file: null,
                  error: `Failed to create image blob for page ${pageNum}`,
                });
              }
            },
            "image/png",
            quality
          );
        });

        results.push(result);
      } catch (pageError) {
        results.push({
          imageUrl: "",
          file: null,
          error: `Failed to convert page ${pageNum}: ${pageError instanceof Error ? pageError.message : String(pageError)}`,
        });
      }
    }

    // Clean up
    pdfDocument.destroy().catch(() => {
      // Ignore cleanup errors
    });

    return results;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return [
      {
        imageUrl: "",
        file: null,
        error: `Failed to convert PDF: ${errorMessage}`,
      },
    ];
  }
}

/**
 * Test function to verify PDF.js library loading
 * @returns Promise<boolean> - True if library loads successfully
 */
export async function testPdfJsLoading(): Promise<boolean> {
  try {
    const lib = await loadPdfJs();
    return lib !== null && typeof lib.getDocument === "function";
  } catch (error) {
    console.error("PDF.js library loading test failed:", error);
    return false;
  }
}

/**
 * Get PDF.js library version information
 * @returns Promise<string> - Version information
 */
export async function getPdfJsVersion(): Promise<string> {
  try {
    const lib = await loadPdfJs();
    return lib.version || "Unknown version";
  } catch (error) {
    return `Error loading PDF.js: ${error instanceof Error ? error.message : String(error)}`;
  }
}
