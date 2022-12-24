import { Profile } from "../models/profile";

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0x80;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    children: name.split(' ').length > 1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name[0]}`,
  };
}

export function truncate(str: string | undefined, limit: number) {
  if (str) {
      return str.length > 40 ? str.substring(0, limit) + '...' : str;
  }
}

export function styleHelper(profile: Profile) {
  return profile.image ? { backgroundImage: `url(${profile.image})` } : { backgroundColor: `${stringToColor(profile.username)}` }
}

export function makeFirstLetterCapital(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function colorFromAnonimity(string: string) {
  switch (string) {
    case 'PUBLIC':
      return 'green';
    case 'PRIVATE':
      return 'black';
    case 'ON INVITE':
      return 'darkblue';
  }
}

export function getCategoryImage(category: string) {
  switch (category) {
    case 'travel':
      return 'https://res.cloudinary.com/dnhcwikgq/image/upload/v1671908851/Evently/travel_pldilw.jpg';
    case 'culture':
      return 'https://res.cloudinary.com/dnhcwikgq/image/upload/v1671908851/Evently/culture_geenyn.jpg';
    case 'film':
      return 'https://res.cloudinary.com/dnhcwikgq/image/upload/v1671908850/Evently/film_std7x5.jpg';
    case 'music':
      return 'https://res.cloudinary.com/dnhcwikgq/image/upload/v1671908850/Evently/music_wlsrrv.jpg';
    case 'food':
      return 'https://res.cloudinary.com/dnhcwikgq/image/upload/v1671908850/Evently/food_xurzv0.jpg';
    case 'drinks':
      return 'https://res.cloudinary.com/dnhcwikgq/image/upload/v1671908850/Evently/drinks_yadb2e.jpg';
  }
}