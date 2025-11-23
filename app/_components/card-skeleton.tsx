export function CardSkeleton() {
  return (
    <div className="relative overflow-hidden animate-pulse">
      <div className={`aspect-video w-full rounded-xl bg-gray-200 shadow-sm`} />
    </div>
  );
}
