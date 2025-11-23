import Link from 'next/link';
import {
  getBestDealByDiscount,
  getDealOptions,
  getDealTime,
  getRestaurantRoute,
} from '@/lib/utils';
import { Deal, Restaurant } from '@/lib/types';
import { Heart, Zap } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';

const OfferBanner = ({ deal, dealType }: { deal: Deal; dealType: string }) => (
  <div className="rounded-sm bg-orange-600 px-2 py-1 shadow-sm">
    <div className="flex items-center gap-1">
      {deal.lightning === 'true' && <Zap size={20} className="fill-yellow-300 stroke-yellow-300" />}
      <p className="text-white font-bold text-xs">{`${deal.discount}% off - ${dealType}`}</p>
    </div>
    <p className="text-white text-[0.625rem]">{getDealTime(deal)}</p>
  </div>
);

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { imageLink, name, suburb, cuisines, deals } = restaurant;
  const bestDineInDeal = getBestDealByDiscount(deals, true);
  const bestTakeawayDeal = getBestDealByDiscount(deals, false);
  const options = getDealOptions(deals);

  return (
    <Link href={getRestaurantRoute(name)} className="group mx-auto w-full" key={name}>
      <div className="flex items-center rounded-sm overflow-hidden shadow-lg relative w-full aspect-video">
        <ImageWithFallback
          width={750}
          height={563}
          src={imageLink}
          className="w-full"
          style={{ objectFit: 'cover' }}
          alt={`${restaurant.name} image`}
          fallback="https://demo.eccdn.com.au/images/D80263E8-FD89-2C70-FF6B-D854ADB8DB00/eatclub_1634706351211.jpg"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {bestDineInDeal.discount && <OfferBanner deal={bestDineInDeal} dealType="Dine In" />}
          {bestTakeawayDeal.discount && <OfferBanner deal={bestTakeawayDeal} dealType="Takeaway" />}
        </div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <p className="font-bold group-hover:underline">{name}</p>
        <Heart size="24" className="text-gray-500" />
      </div>
      <p className="text-sm group-hover:underline text-gray-500">{suburb}</p>
      <p className="text-xs font-bold group-hover:underline text-gray-500">{cuisines.join(', ')}</p>
      <p className="text-xs group-hover:underline text-gray-500">{options.join(' • ')}</p>
    </Link>
  );
}
