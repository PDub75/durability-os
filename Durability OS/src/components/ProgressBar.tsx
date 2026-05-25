interface ProgressBarProps {
  current: number;
  target: number;
  className?: string;
}

export default function ProgressBar({
  current,
  target,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = percentage >= 100;

  return (
    <div className={`relative ${className}`}>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden shadow-sm">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            isComplete
              ? 'bg-gradient-to-r from-success-400 to-success-600 shadow-md'
              : 'bg-gradient-to-r from-primary-400 to-primary-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 mt-1 flex justify-between">
        <span className="font-medium">{Math.round(percentage)}%</span>
        <span className="text-right">{Math.round(current)} / {target}</span>
      </div>
    </div>
  );
}
