export const CircularProgressbar = ({
  percentage,
  size = 200,
  strokeWidth = 15,
}: {
  percentage: number;
  size: number;
  strokeWidth: number;
}) => {
  const radius = size / 2 - strokeWidth; // Calculate the circle radius
  const circumference = 2 * Math.PI * radius; // Calculate circle circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Progress offset

  return (
    <svg height={size} width={size}>
      {/* Define Gradient */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF8C00" /> {/* Start Color */}
          <stop offset="100%" stopColor="#6A00FF" /> {/* End Color */}
        </linearGradient>
      </defs>
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
        stroke="url(#gradient)" // Apply gradient
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
