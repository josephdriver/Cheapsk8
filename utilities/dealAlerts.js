import { FAVOURITES_CACHE_OFFSET } from "../constants/Defaults";

export const PLACE_HOLDER = "place holder";

export const gameAlerts = (deal, game) => {
  let isLowest = false;
  let isAlert = false;

  const savings = parseFloat(deal.savings);
  const price = parseFloat(deal.price);
  const cheapestPriceEver = parseFloat(game.lowestPriceEver);
  const { threshold } = game.alertLevel;

  if (parseFloat(deal.price) <= cheapestPriceEver) {
    isLowest = true;
  }

  if (threshold !== "never") {
    if (
      (savings >= parseInt(threshold, 10) && savings > 0) ||
      (threshold === "cheapest" && price <= cheapestPriceEver)
    ) {
      isAlert = true;
    }
  }

  return { isLowest, isAlert };
};

export const favouriteCollectionAlerts = (game) => {
  let isLowest = false;
  let isAlert = false;

  if (parseFloat(game.lowestPrice) <= parseFloat(game.lowestPriceEver)) {
    isLowest = true;
  }

  if (game.alertLevel.threshold !== "never") {
    if (
      (parseFloat(game.highestPercent) >=
        parseInt(game.alertLevel.threshold, 10) &&
        parseFloat(game.highestPercent) > 0) ||
      (game.alertLevel.threshold === "cheapest" &&
        parseFloat(game.lowestPrice) <= parseFloat(game.lowestPriceEver))
    ) {
      isAlert = true;
    }
  }

  return { isLowest, isAlert };
};

export const getGamesToUpdate = (favourites) => {
  const updateIds = [];
  favourites.forEach((f) => {
    if (f.fetchTime + FAVOURITES_CACHE_OFFSET < new Date().getTime()) {
      updateIds.push(f.gameId);
    }
  });
  return updateIds.length > 0 ? updateIds : null;
};

export const getAlertTime = (
  lowestPrice,
  lowestPriceEver,
  highestPercent,
  alertTime,
  alertLevel
) => {
  switch (alertLevel.threshold) {
    case "never":
      return null;
    case "cheapest":
      if (
        parseFloat(lowestPrice) <= parseFloat(lowestPriceEver) &&
        !alertTime
      ) {
        return new Date().getTime();
      }
      if (parseFloat(lowestPrice) > parseFloat(lowestPriceEver) && alertTime) {
        return null;
      }
      return alertTime;
    default:
      if (
        parseFloat(highestPercent) >= parseInt(alertLevel.threshold, 10) &&
        !alertTime
      ) {
        return new Date().getTime();
      }
      if (
        parseFloat(highestPercent) < parseInt(alertLevel.threshold, 10) &&
        alertTime
      ) {
        return null;
      }
      return alertTime;
  }
};

export const getGameReferenceValues = (deals) => {
  let highestPercent = null;
  let lowestPrice = null;
  let lowestStoreId = null;

  deals.forEach((d) => {
    if (!highestPercent || parseFloat(d.savings) > parseFloat(highestPercent)) {
      highestPercent = d.savings;
    }
    if (!lowestPrice || parseFloat(d.price) < parseFloat(lowestPrice)) {
      lowestPrice = d.price;
      lowestStoreId = d.storeID;
    }
  });

  return {
    highestPercent,
    lowestPrice,
    lowestStoreId,
  };
};
