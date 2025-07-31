import { prepareInstructions } from "../../constants/index";
import React, { useState } from "react";
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
  const { fs, kv, ai, auth, isLoading } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
    setIsProcessing(true);
    setStatusText("uploading resume...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) {
      setStatusText("failed to upload resume");
      setIsProcessing(false);
      return;
    }

    setStatusText("converting resume to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      setStatusText("failed to convert resume to image");
      setIsProcessing(false);
      return;
    }

    setStatusText("uploading resume image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      setStatusText("failed to upload resume image");
      setIsProcessing(false);
      return;
    }

    setStatusText("analyzing resume...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      companyName,
      jobTitle,
      jobDescription,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) {
      setStatusText("failed to analyze resume");
      setIsProcessing(false);
      return;
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0];

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setIsProcessing(false);
    setStatusText("Resume analyzed successfully");
    console.log(data);
    // navigate(`/upload/${uuid}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-cover bg-[url('/images/bg-main.svg')]">
      <Navbar />
      <section className="main-section">
        <div className="page-heading pt-6 pb-10 py-16">
          <h1>Upload your resume</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src={"/images/resume-scan.gif"}
                alt="resume-scan"
                className="w-full"
              />
            </>
          ) : (
            <h2>
              Upload your resume to get ATS score and personalized feedback
            </h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="Enter job title"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  id="job-description"
                  name="job-description"
                  placeholder="Enter job description"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button type="submit" className="primary-button">
                Submit
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
