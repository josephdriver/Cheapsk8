export const PLACE_HOLDER = "place holder";

export const gameAlerts = (deal, game) => {
  let isLowest = false;
  let isAlert = false;

  const savings = parseFloat(deal.savings);
  const price = parseFloat(deal.price);
  const cheapestPriceEver = parseFloat(game.cheapestPriceEver.price);
  const { threshold } = game.alertLevel;

  if (parseFloat(deal.price) <= parseFloat(game.cheapestPriceEver.price)) {
    isLowest = true;
  }

  if (
    savings >= parseInt(threshold, 10) ||
    (threshold === "anyDiscount" && savings > 0) ||
    (threshold === "lowest" && price <= cheapestPriceEver)
  ) {
    isAlert = true;
  }
  return { isLowest, isAlert };
};

export const favouriteCollectionAlerts = (game) => {
  let isLowest = false;
  let isAlert = false;

  game.deals.forEach((deal) => {
    const alerts = gameAlerts(deal, game);

    if (alerts.isLowest) {
      isLowest = true;
    }

    if (alerts.isAlert) {
      isAlert = true;
    }
  });
  return { isLowest, isAlert };
};
