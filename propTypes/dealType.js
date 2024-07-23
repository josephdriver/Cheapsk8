import PropTypes from "prop-types";

export const infoPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  steamAppID: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
}).isRequired;

export const cheapestPriceEverType = PropTypes.shape({
  price: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
}).isRequired;

export const dealPropTypes = PropTypes.shape({
  storeID: PropTypes.string.isRequired,
  dealID: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  retailPrice: PropTypes.string.isRequired,
  savings: PropTypes.string.isRequired,
});

export const gameType = PropTypes.shape({
  info: infoPropTypes,
  cheapestPriceEver: cheapestPriceEverType,
  deals: PropTypes.arrayOf(dealPropTypes),
});

export const gameListType = PropTypes.shape({
  gameID: PropTypes.string.isRequired,
  steamAppID: PropTypes.string, // Nullable
  cheapest: PropTypes.string.isRequired,
  cheapestDealID: PropTypes.string.isRequired,
  external: PropTypes.string.isRequired,
  internalName: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
});

export const dealListType = PropTypes.shape({
  internalName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  metacriticLink: PropTypes.string.isRequired,
  dealID: PropTypes.string.isRequired,
  storeID: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
  salePrice: PropTypes.string.isRequired,
  normalPrice: PropTypes.string.isRequired,
  isOnSale: PropTypes.string.isRequired,
  savings: PropTypes.string.isRequired,
  metacriticScore: PropTypes.string.isRequired,
  steamRatingText: PropTypes.string.isRequired,
  steamRatingPercent: PropTypes.string.isRequired,
  steamRatingCount: PropTypes.string.isRequired,
  steamAppID: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  lastChange: PropTypes.number.isRequired,
  dealRating: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
});

export const gameInfoType = PropTypes.shape({
  storeID: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  steamAppID: PropTypes.string.isRequired,
  salePrice: PropTypes.string.isRequired,
  retailPrice: PropTypes.string.isRequired,
  steamRatingText: PropTypes.string.isRequired,
  steamRatingPercent: PropTypes.string.isRequired,
  steamRatingCount: PropTypes.string.isRequired,
  metacriticScore: PropTypes.string.isRequired,
  metacriticLink: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  publisher: PropTypes.string.isRequired,
  steamworks: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
}).isRequired;

export const cheaperStoreType = PropTypes.shape({
  dealID: PropTypes.string.isRequired,
  storeID: PropTypes.string.isRequired,
  salePrice: PropTypes.string.isRequired,
  retailPrice: PropTypes.string.isRequired,
}).isRequired;

export const cheapestPriceType = PropTypes.shape({
  price: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
}).isRequired;

export const dealType = PropTypes.shape({
  gameInfo: gameInfoType,
  cheaperStores: PropTypes.arrayOf(cheaperStoreType),
  cheapestPrice: cheapestPriceType,
}).isRequired;

export const storeType = PropTypes.shape({
  storeID: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  images: PropTypes.shape({
    banner: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired;
