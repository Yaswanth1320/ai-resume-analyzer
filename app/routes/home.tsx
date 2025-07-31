import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants/index";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar.js";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumAI" },
    { name: "description", content: "AI Resume Analyzer" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-cover bg-[url('/images/bg-main.svg')]">
      <Navbar />
      <section className="main-section">
        <div className="page-heading pt-6 pb-10">
          <h1>Track your application status with AI</h1>
          <h2>
            Get personalized feedback on your resume and cover letter to improve
            your chances of getting hired.
          </h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <div key={resume.id}>
                <ResumeCard key={resume.id} resume={resume} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
