import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Deal, Restaurant } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNameFromUrl = (collection: string): string => {
  return decodeURIComponent(collection).replaceAll('-', ' ');
};

export const formatNameForUrl = (name: string) => {
  return encodeURIComponent(name.toLocaleLowerCase().replaceAll(' ', '-'));
};

export const getRestaurantRoute = (name: string) => `/restaurant/${formatNameForUrl(name)}`;

export const getBestDealByDiscount = (deals: Deal[], isDineIn: boolean) =>
  deals.reduce((acc, current) => {
    if (current.dineIn === isDineIn.toString()) {
      if (
        !acc.discount ||
        (parseInt(current.qtyLeft) > 0 && parseInt(current.discount) > parseInt(acc.discount))
      ) {
        return current;
      }
    }

    return acc;
  }, {} as Deal);

export const sortDealByBestDiscount = (deals: Deal[]) => {
  return deals.sort((a, b) => parseInt(b.discount) - parseInt(a.discount));
};

export const sortRestaurantByBestDeal = (restaurants: Restaurant[]) => {
  return restaurants.sort(
    (a, b) =>
      parseInt(sortDealByBestDiscount(b.deals)[0].discount) -
      parseInt(sortDealByBestDiscount(a.deals)[0].discount)
  );
};

export const getDealOptions = (deals: Deal[]) =>
  deals
    .reduce((acc, current) => {
      if (current.dineIn === 'true' && !acc.includes('Dine In')) {
        return acc.concat('Dine In');
      }
      if (current.dineIn === 'false' && !acc.includes('Takeaway')) {
        return acc.concat('Takeaway');
      }
      return acc;
    }, [] as string[])
    .sort();

export const getDealTime = (deal: Deal) => {
  if (deal.open) {
    if (deal.close) {
      return `Arrive between ${deal.open} - ${deal.close}`;
    }
    return `Arrive After ${deal.open}`;
  } else if (deal.close) {
    return `Arrive before ${deal.close}`;
  } else return `Anytime today`;
};
