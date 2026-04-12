export const CircleProgressbar = ({
  percentage,
  size = 200,
  strokeWidth = 15,
}: {
  percentage: number;
  size: number;
  strokeWidth: number;
}) => {
  const radius = size / 2 - strokeWidth; // Dynamically calculate radius based on size and strokeWidth
  const circumference = 2 * Math.PI * radius; // Circle circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Stroke offset for the progress

  return (
    <svg height={size} width={size}>
      {/* Background Circle */}
      <circle
        stroke="#E6E6E6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress Circle */}
      <circle
        stroke="#0088FE"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round" // Rounded edges
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Centered Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={`${size * 0.1}px`} // Dynamically scale text size
        fill="#333"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};
