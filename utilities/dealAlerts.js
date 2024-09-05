export const PLACE_HOLDER = "place holder";
export const thresholdAlerts = (item) => {
  let isLowest = false;
  let isAlert = false;

  item.deals.forEach((d) => {
    if (parseFloat(d.price) <= parseFloat(item.cheapestPriceEver.price)) {
      isLowest = true;
    }

    if (
      parseInt(100 - Math.round(d.savings), 10) <=
        parseInt(item.alertLevel.threshold, 10) ||
      (item.alertLevel.threshold === "anyDiscount" && parseFloat(d.savings) > 0)
    ) {
      isAlert = true;
    }
  });
  return { isLowest, isAlert };
};
