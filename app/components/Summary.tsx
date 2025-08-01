import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="resume-summary">
      <div className="category hover:bg-gray-100 transition-colors">
        <div className="flex flex-row gap-3 items-center justify-center">
          <p className="text-base font-medium text-gray-700">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-base font-semibold">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden">
      <div className="flex flex-row items-center p-6 gap-6 border-b border-gray-100">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-gray-900">Your Resume Score</h2>
          <p className="text-xs text-gray-500">
            This score is based on the overall quality of your resume.
          </p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};

export default Summary;
