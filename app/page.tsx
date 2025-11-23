import { Suspense } from 'react';
import RestaurantList from './_components/restaurant-list';
import RestaurantListSkeleton from './_components/restaurant-list-skeleton';

type SearchParams = Promise<{ query: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const query = (await searchParams).query || '';

  return (
    <div className="p-4 lg:p-8">
      <Suspense key={query} fallback={<RestaurantListSkeleton />}>
        <RestaurantList query={query} />
      </Suspense>
    </div>
  );
}
