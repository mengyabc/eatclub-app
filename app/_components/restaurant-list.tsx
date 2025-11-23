'use client';

import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../api';
import RestaurantCard from './restaurant-card';
import RestaurantListSkeleton from './restaurant-list-skeleton';
import { sortRestaurantByBestDeal } from '@/lib/utils';

export default function RestaurantList({ query }: { query: string }) {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['get-restaurant-listing'],
    queryFn: getRestaurants,
  });

  const filteredRestaurants = query
    ? restaurants?.filter(
        (item) =>
          item.cuisines.some((cuisine) =>
            cuisine.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          ) || item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    : restaurants;

  if (isLoading) {
    return <RestaurantListSkeleton />;
  }

  if (!restaurants?.length) {
    return (
      <p className="text-center text-lg">
        Sorry, we are having issues loading the restaurants. Please try again later.
      </p>
    );
  }

  if (!filteredRestaurants?.length) {
    return <p className="text-center text-lg">Sorry, there are no restaurants found.</p>;
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortRestaurantByBestDeal(filteredRestaurants).map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.objectId} />
        ))}
      </div>
    </>
  );
}
