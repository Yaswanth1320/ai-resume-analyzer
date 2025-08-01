const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 35;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80)
      return { bg: "#dcfce7", stroke: "#22c55e", text: "#166534" };
    if (score >= 60)
      return { bg: "#fef3c7", stroke: "#eab308", text: "#92400e" };
    return { bg: "#fee2e2", stroke: "#ef4444", text: "#991b1b" };
  };

  const colors = getScoreColor(score);

  return (
    <div className="relative w-[80px] h-[80px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#f3f4f6"
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Progress circle with dynamic color */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={colors.stroke}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>

      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center -space-y-0.5">
          <span
            className="font-bold text-xs leading-none mb-0.5"
            style={{ color: colors.text }}
          >
            {score}
          </span>
          <span className="text-[8px] text-black font-medium leading-none">
            /100
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCircle;
