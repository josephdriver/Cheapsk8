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
  const shuffledPayload = shuffle(payload);
  let largeCardCount = 0;
  let pairArray = [];
  let rows = [];
  shuffledPayload.forEach((dealItem, index) => {
    if (
      dealItem.steamAppID &&
      largeCardCount < 11 &&
      !dealItem.title.toLowerCase().includes("collection") &&
      !dealItem.title.toLowerCase().includes("edition") &&
      !dealItem.title.toLowerCase().includes("bundle") &&
      !dealItem.title.toLowerCase().includes("pack")
    ) {
      rows.push({ header: dealItem });
      largeCardCount += 1;
    } else if (pairArray.length === 1) {
      pairArray.push(dealItem);
      rows.push({ row: pairArray });
      pairArray = [];
    } else {
      pairArray.push(dealItem);
      if (payload.length - 1 === index) {
        rows.push({ row: pairArray });
        pairArray = [];
      }
    }
  });

  if (rows.length > 1 && rows[0].header) {
    const firstEl = rows[0];
    const arrayToShuffle = rows.slice(1);
    const shuffledArray = shuffle(arrayToShuffle);
    shuffledArray.unshift(firstEl);
    rows = shuffledArray;
  }

  const finalArray = [];
  rows.forEach((row) => {
    if (!row.row || row.row.length !== 1) {
      finalArray.push(row);
    }
  });
  return { deals: payload, rows: finalArray };
}
