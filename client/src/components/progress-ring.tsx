interface ProgressRingProps {
  percentage: number;
  level: number;
  size?: number;
}

export default function ProgressRing({ 
  percentage, 
  level, 
  size = 48 
}: ProgressRingProps) {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background Circle */}
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-[#4ECDC4] transition-all duration-500 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Progress Percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-sm">
          {percentage}%
        </span>
      </div>
      
      {/* Level Badge */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FECA57] rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-gray-800">{level}</span>
      </div>
    </div>
  );
}
