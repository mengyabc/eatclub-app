import RestaurantDetailSkeleton from '@/app/_components/restaurant-detail-skeleton';
import RestaurantDetail from '@/app/_components/restaurant-details';
import { Suspense } from 'react';

type Params = Promise<{ name: string }>;

export default async function Restaurant({ params }: { params: Params }) {
  const restaurantName = (await params)?.name || '';

  return (
    <Suspense key={restaurantName} fallback={<RestaurantDetailSkeleton />}>
      <RestaurantDetail name={restaurantName} />
    </Suspense>
  );
}
