import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  {
    title: "Review Resume",
  },
  {
    name: "description",
    content: "Detailed review of your resume",
  },
];

const resume = () => {
  const { fs, kv, auth, isLoading } = usePuterStore();
  const { id } = useParams();
  const [resumeUrl, setResumeUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  console.log(feedback);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], {
        type: "application/pdf",
      });

      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0 bg-gray-50 min-h-screen">
      <nav className="resume-nav bg-white border-b border-gray-100 shadow-sm">
        <Link to="/" className="back-button hover:bg-gray-50 transition-colors">
          <img src="/icons/back.svg" alt="Back" className="w-4 h-4" />
          <span className="text-gray-700 text-sm font-medium">
            Back to HomePage
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-white shadow-sm border-r border-gray-100 h-[95vh] sticky top-0 flex items-center justify-center p-6">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-500 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit hover:shadow-lg transition-shadow">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full h-full flex items-center justify-center group"
              >
                <img
                  src={imageUrl}
                  alt="resume"
                  title="Click to view PDF"
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section bg-white">
          <div className="px-8 py-2">
            {feedback ? (
              <div className="flex flex-col gap-6 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <img
                  src="/images/resume-scan-2.gif"
                  alt="Analyzing resume"
                  className="w-64 h-64 object-contain"
                />
                <p className="text-gray-500 text-sm mt-4">
                  Analyzing your resume...
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default resume;
