'use client';

import { ImageWithFallback } from '@/app/_components/image-with-fallback';
import RestaurantDetailSkeleton from '@/app/_components/restaurant-detail-skeleton';
import { getRestaurants } from '@/app/api';
import { Button } from '@/components/ui/button';
import { formatNameFromUrl, getDealTime, sortDealByBestDiscount } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Clock3, Heart, MapPin, MapPinned, NotebookText, PhoneCall, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';

const actions = [
  {
    text: 'Menu',
    icon: <NotebookText />,
  },
  {
    text: 'Call us',
    icon: <PhoneCall />,
  },
  {
    text: 'Location',
    icon: <MapPinned />,
  },
  {
    text: 'Favorite',
    icon: <Heart />,
  },
];

export default function RestaurantDetail({ name }: { name: string }) {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['get-restaurant-listing'],
    queryFn: getRestaurants,
  });

  const restaurant = restaurants?.find((restaurant) =>
    formatNameFromUrl(decodeURIComponent(name)).includes(restaurant.name.toLocaleLowerCase())
  );

  if (isLoading) return <RestaurantDetailSkeleton />;

  if (!restaurant) return notFound();

  return (
    <div className="grid sm:gap-6 sm:grid-cols-2 sm:p-4 lg:p-8">
      <div>
        <div className="flex items-center overflow-hidden relative w-full aspect-video">
          <ImageWithFallback
            width={750}
            height={563}
            src={restaurant.imageLink}
            className="w-full"
            style={{ objectFit: 'cover' }}
            alt={`${name} image`}
            fallback="https://demo.eccdn.com.au/images/D80263E8-FD89-2C70-FF6B-D854ADB8DB00/eatclub_1634706351211.jpg"
          />
        </div>
        <div className="flex justify-between items-center gap-4 py-2 px-8 border-b">
          {actions.map((action) => (
            <div className="flex flex-col items-center" key={action.text}>
              {action.icon}
              <p className="text-xs">{action.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="px-8 py-4">
          <p className="text-lg font-bold text-center pb-1">{restaurant.name}</p>
          <p className="text-xs text-zinc-400 text-center pb-4 border-b">
            {restaurant.cuisines.join(' • ')}
          </p>
        </div>
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 text-gray-500 pb-2">
            <Clock3 size={20} />
            <p className="text-gray-600 text-sm">
              Hours: {restaurant.open} - {restaurant.close}
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 pb-4 border-b">
            <MapPin size={20} />
            <p className="text-gray-600 text-sm">{`${restaurant.address1} ${restaurant.suburb}`}</p>
          </div>
          {sortDealByBestDiscount(restaurant.deals).map((deal) => (
            <div className="flex justify-between items-center py-2 border-b" key={deal.objectId}>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {deal.lightning === 'true' && (
                    <Zap size={20} className="fill-yellow-400 stroke-yellow-400" />
                  )}
                  <p className="text-orange-700 font-bold">{deal.discount}% Off</p>
                </div>
                <p className="text-xs text-gray-400">{getDealTime(deal)}</p>
                <p className="text-xs text-gray-300">
                  {deal.qtyLeft} Deal{parseInt(deal.qtyLeft) > 1 ? 's' : ''} Left
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-orange-700 text-orange-700 hover:bg-orange-700 hover:text-white"
              >
                Redeem
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
