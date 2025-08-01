import { prepareInstructions } from "../../constants/index";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2image";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

export const meta = () => [
  {
    title: "Upload",
    content: "Upload your resume to get ATS score and personalized feedback",
  },
];

const upload = () => {
  const navigate = useNavigate();
  const { fs, kv, ai, auth, isLoading } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    console.log("handleAnalyze called with:", {
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
    setIsProcessing(true);
    setStatusText("uploading resume...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) {
      return setStatusText("failed to upload resume");
    }

    setStatusText("converting resume to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      return setStatusText("failed to convert resume to image");
    }

    setStatusText("uploading resume image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      return setStatusText("failed to upload resume image");
    }

    setStatusText("analyzing resume...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) {
      return setStatusText("failed to analyze resume");
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Resume analyzed successfully");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");

    const form = e.currentTarget.closest("form");
    if (!form) {
      console.log("No form found");
      return;
    }

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    console.log("Form data:", { companyName, jobTitle, jobDescription, file });

    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("Starting analysis...");
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />

      <section className="px-4 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Header Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Upload your resume
            </h1>
            {isProcessing ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">{statusText}</span>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-start">
                  <img
                    src={"/images/resume-scan.gif"}
                    alt="resume-scan"
                    className="w-32 md:w-40 rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 max-w-xl">
                Upload your resume to get ATS score and personalized feedback
              </p>
            )}
          </div>

          {/* Form Section */}
          {!isProcessing && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30">
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-div">
                    <label
                      htmlFor="company-name"
                      className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company-name"
                      name="company-name"
                      placeholder="Enter company name"
                      required
                      className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                    />
                  </div>
                  <div className="form-div">
                    <label
                      htmlFor="job-title"
                      className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                        />
                      </svg>
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="job-title"
                      name="job-title"
                      placeholder="Enter job title"
                      required
                      className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="form-div">
                  <label
                    htmlFor="job-description"
                    className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Job Description
                  </label>
                  <textarea
                    rows={4}
                    id="job-description"
                    name="job-description"
                    placeholder="Enter job description"
                    required
                    className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none transition-all duration-200"
                  />
                </div>

                <div className="form-div">
                  <label
                    htmlFor="uploader"
                    className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload Resume
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Analyze Resume</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
