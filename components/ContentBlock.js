/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Divider, Text, useTheme } from "@rneui/themed";
import IconImage from "./IconImage";
import DEFAULT_STORES from "../constants/Defaults";
import LargeCard from "./LargeCard";
import OneByTwoCard from "./OnebyTwoCard";

function ContentBlock({
  deals,
  savedStores,
  stores,
  loading,
  contentLoading,
  setContentLoading,
}) {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function shuffle(arr) {
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

  const formatData = useCallback((rawData) => {
    const largeCardQty = getRandomArbitrary(1, 3.5);

    let largeCardCount = 0;
    const content = [];
    let pairArray = [];

    rawData.map((item) => {
      const storeObj = { storeID: item.storeID, data: [] };
      item.data.map((dealItem, index) => {
        if (dealItem.steamAppID && largeCardCount < largeCardQty) {
          storeObj.data.push({ header: dealItem });
          largeCardCount += 1;
        } else if (pairArray.length === 1) {
          pairArray.push(dealItem);
          storeObj.data.push({ row: pairArray });
          pairArray = [];
        } else {
          pairArray.push(dealItem);
          if (item.data.length - 1 === index) {
            storeObj.data.push({ row: pairArray });
            pairArray = [];
          }
        }
        return dealItem;
      });

      if (storeObj.data.length > 1 && storeObj.data[0].header) {
        const firstEl = storeObj.data[0];
        const arrayToShuffle = storeObj.data.slice(1);
        const shuffledArray = shuffle(arrayToShuffle);
        shuffledArray.unshift(firstEl);
        storeObj.data = shuffledArray;
      }

      let partialRow = [];
      const finalArray = [];
      storeObj.data.map((row) => {
        if (!row.row || row.row.length !== 1) {
          return finalArray.push(row);
        }
        partialRow = row;
        return row;
      });

      if (partialRow.length > 0) {
        finalArray.push({ row: partialRow });
      }

      storeObj.data = finalArray;

      content.push(storeObj);
      largeCardCount = 0;
      return item;
    });

    return content;
  }, []);

  useEffect(() => {
    const validDeals = [];
    setContentLoading(true);
    if (deals.length > 0 && savedStores && savedStores.length > 0) {
      deals.map((item) => {
        if (savedStores.find((el) => el.storeID === item.storeID)) {
          validDeals.push(item);
        }
        return item;
      });
    } else {
      deals.map((item) => {
        if (
          DEFAULT_STORES.find(
            (el) => parseInt(el.storeID, 10) === parseInt(item.storeID, 10)
          )
        ) {
          validDeals.push(item);
        }
        return item;
      });
    }

    const shuffledContent = formatData(validDeals);
    setData(shuffledContent);
    setContentLoading(false);
  }, [deals, savedStores, formatData, setContentLoading]);

  function getStoreTitle(id) {
    if (stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.storeName;
    }
    return null;
  }

  function getStoreLogo(id) {
    if (stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.images.logo;
    }
    return null;
  }

  if (data.length > 0) {
    return (
      <>
        {data.map((store) => (
          <View key={store.storeID} style={{ marginHorizontal: 10 }}>
            <View
              key={store.storeID}
              style={{
                flexDirection: "row",
                paddingBottom: 5,
              }}
            >
              <View style={styles.image}>
                <IconImage
                  url={getStoreLogo(store.storeID)}
                  width={30}
                  height={30}
                />
              </View>
              <View style={{ flex: 9 }}>
                <Text h4 style={{ color: theme.colors.primary }}>
                  {getStoreTitle(store.storeID)} Deals
                </Text>
              </View>
            </View>
            <Divider style={{ color: theme.colors.platform }} />

            <View style={{ marginVertical: 10 }}>
              {store.data.map((item) =>
                item.header ? (
                  <LargeCard key={item.header.dealID} deal={item.header} />
                ) : (
                  <OneByTwoCard key={item.row[0].dealID} deals={item.row} />
                )
              )}
            </View>
          </View>
        ))}
      </>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "center",
  },
});
export default ContentBlock;
