export function ProgressBar({
  label,
  value,
}: {
  label?: string;
  value: number;
}) {
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-xs text-[var(--ayco-text-secondary)]">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div className="h-2 rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-[var(--ayco-brand-indigo)] transition"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
