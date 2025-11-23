import { Restaurant } from '@/lib/types';
import mockData from './mock.json';

export const getRestaurants = (): Restaurant[] => {
  // const response = await fetch('https://eccdn.com.au/misc/challengedata.json');
  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }
  // return response.json();
  return mockData.restaurants;
};
