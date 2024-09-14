import { TUser } from './user.js';

type TFacilities = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type TOffer = {
  name: string;
  description: string;
  publicData: string;
  city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf' ;
  previewPhoto: string;
  photos: [string, string, string, string, string, string];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: 'apartment' | 'house' | 'room' | 'hotel';
  rooms: number;
  adults: number;
  facilities: TFacilities[];
  author: TUser;
  commentsLength: number;
  coordinates: {
    latitude: number;
    longitude: number;
  }
};
