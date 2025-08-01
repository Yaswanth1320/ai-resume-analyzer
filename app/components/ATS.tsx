import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-xl shadow-sm border w-full p-6 flex flex-col gap-4",
        score > 69
          ? "bg-green-50 border-green-200"
          : score > 49
            ? "bg-yellow-50 border-yellow-200"
            : "bg-red-50 border-red-200"
      )}
    >
      <div className="flex flex-row gap-3 items-center">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-8 h-8"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-900">
            ATS Score - {score}/100
          </p>
          <p className="text-xs text-gray-500">
            Applicant Tracking System compatibility
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-medium text-sm text-gray-700">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-xs text-gray-500">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>

        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div className="flex flex-row gap-2 items-start" key={index}>
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="ATS"
                className="w-3 h-3 mt-0.5 flex-shrink-0"
              />
              <p className="text-xs text-gray-600 leading-relaxed">
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
