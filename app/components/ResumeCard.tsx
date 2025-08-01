import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

function ResumeCard({ resume }: { resume: Resume }) {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResumes();
  }, [resume.imagePath]);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Header with company and score */}
      <div className="p-4 pb-3 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {resume.companyName && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-blue-600"
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
                </div>
                <h2 className="text-sm font-bold text-gray-900 truncate">
                  {resume.companyName}
                </h2>
              </div>
            )}
            {resume.jobTitle && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 rounded-md flex items-center justify-center">
                  <svg
                    className="w-2 h-2 text-purple-600"
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
                </div>
                <h3 className="text-xs text-gray-600 truncate">
                  {resume.jobTitle}
                </h3>
              </div>
            )}

            {!resume.companyName && !resume.jobTitle && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-green-600"
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
                </div>
                <h2 className="text-sm font-bold text-gray-900">Resume</h2>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 ml-3">
            <ScoreCircle score={resume.feedback.overallScore} />
          </div>
        </div>
      </div>

      {/* Resume Image - Smaller Square */}
      {resumeUrl && (
        <div className="relative">
          <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* View icon on hover */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/50">
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      )}
    </Link>
  );
}

export default ResumeCard;
