export default function RestaurantDetailSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 animate-pulse sm:p-4 lg:p-8">
      <div className="relative overflow-hidden animate-pulse">
        <div className={`aspect-video w-full bg-gray-200 shadow-sm`} />
      </div>
      <div className="space-y-3 px-4 sm:pt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
        </div>
        <div className="h-2 rounded bg-gray-200"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
        </div>
        <div className="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
