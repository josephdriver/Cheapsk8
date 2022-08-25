/* eslint-disable no-param-reassign */
export function shuffle(arr) {
  let j;
  let x;
  let index;
  for (index = arr.length - 1; index > 0; index -= 1) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

export function parseDeals(payload) {
  const deals = [];
  const blocks = [];

  let largeCardCount = 0;
  let pairArray = [];

  payload.map((collection) => {
    if (collection.value.data.length > 0) {
      const storeObj = {
        storeID: collection.value.data[0].storeID,
        data: collection.value.data,
      };
      deals.push(storeObj);

      const blockObj = {
        storeID: collection.value.data[0].storeID,
        data: [],
      };

      collection.value.data.map((dealItem, index) => {
        if (dealItem.steamAppID && largeCardCount < 2) {
          blockObj.data.push({ header: dealItem });
          largeCardCount += 1;
        } else if (pairArray.length === 1) {
          pairArray.push(dealItem);
          blockObj.data.push({ row: pairArray });
          pairArray = [];
        } else {
          pairArray.push(dealItem);
          if (collection.value.data.length - 1 === index) {
            blockObj.data.push({ row: pairArray });
            pairArray = [];
          }
        }
        return dealItem;
      });

      if (blockObj.data.length > 1 && blockObj.data[0].header) {
        const firstEl = blockObj.data[0];
        const arrayToShuffle = blockObj.data.slice(1);
        const shuffledArray = shuffle(arrayToShuffle);
        shuffledArray.unshift(firstEl);
        blockObj.data = shuffledArray;
      }

      let partialRow = [];
      const finalArray = [];
      blockObj.data.map((row) => {
        if (!row.row || row.row.length !== 1) {
          return finalArray.push(row);
        }
        partialRow = row;
        return row;
      });

      if (partialRow.length > 0) {
        finalArray.push({ row: partialRow });
      }

      blockObj.data = finalArray;

      blocks.push(blockObj);
      largeCardCount = 0;
      return collection;
    }
    return collection;
  });

  return { deals, blocks };
}
