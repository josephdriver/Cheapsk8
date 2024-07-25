import { string, number, shape, arrayOf, oneOfType, bool } from "prop-types";

export const infoPropTypes = shape({
  title: string.isRequired,
  steamAppID: string,
  thumb: string.isRequired,
}).isRequired;

export const cheapestPriceEverType = shape({
  price: string.isRequired,
  date: number.isRequired,
}).isRequired;

export const dealPropTypes = shape({
  storeID: string.isRequired,
  dealID: string.isRequired,
  price: string.isRequired,
  retailPrice: string.isRequired,
  savings: string.isRequired,
});

export const alertLevelType = shape({
  id: number.isRequired,
  label: string.isRequired,
  threshold: oneOfType([number.isRequired, string.isRequired]),
});

export const favouriteType = shape({
  info: infoPropTypes,
  cheapestPriceEver: cheapestPriceEverType,
  deals: arrayOf(dealPropTypes),
  gameID: string.isRequired,
  alertLevels: alertLevelType,
  activeAlert: bool,
  lastSeen: number,
});

export const gameType = shape({
  info: infoPropTypes,
  cheapestPriceEver: cheapestPriceEverType,
  deals: arrayOf(dealPropTypes),
});

export const gameListType = shape({
  gameID: string.isRequired,
  steamAppID: string,
  external: string.isRequired,
  thumb: string.isRequired,
});

export const dealListType = shape({
  internalName: string.isRequired,
  title: string.isRequired,
  metacriticLink: string,
  dealID: string.isRequired,
  storeID: string.isRequired,
  gameID: string.isRequired,
  salePrice: string.isRequired,
  normalPrice: string.isRequired,
  isOnSale: string.isRequired,
  savings: string.isRequired,
  metacriticScore: string,
  steamRatingText: string,
  steamRatingPercent: string,
  steamRatingCount: string,
  steamAppID: string,
  releaseDate: number.isRequired,
  lastChange: number.isRequired,
  dealRating: string.isRequired,
  thumb: string.isRequired,
});

export const gameInfoType = shape({
  storeID: string.isRequired,
  gameID: string.isRequired,
  name: string.isRequired,
  steamAppID: string,
  salePrice: string.isRequired,
  retailPrice: string.isRequired,
  steamRatingText: string,
  steamRatingPercent: string,
  steamRatingCount: string,
  metacriticScore: string,
  metacriticLink: string,
  releaseDate: number.isRequired,
  publisher: string.isRequired,
  steamworks: string,
  thumb: string.isRequired,
}).isRequired;

export const cheaperStoreType = shape({
  dealID: string.isRequired,
  storeID: string.isRequired,
  salePrice: string.isRequired,
  retailPrice: string.isRequired,
}).isRequired;

export const cheapestPriceType = shape({
  price: string.isRequired,
  date: number.isRequired,
}).isRequired;

export const dealType = shape({
  gameInfo: gameInfoType,
  cheaperStores: arrayOf(cheaperStoreType),
  cheapestPrice: cheapestPriceType,
}).isRequired;

export const storeType = shape({
  storeID: string.isRequired,
  storeName: string.isRequired,
  isActive: oneOfType([number.isRequired, string.isRequired]),
  images: shape({
    banner: string.isRequired,
    logo: string.isRequired,
    icon: string.isRequired,
  }).isRequired,
});
