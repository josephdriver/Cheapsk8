/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, Text, Button } from "@rneui/themed";
import { fetchDeals } from "../redux/dealsSlice";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";
import DEFAULT_STORES from "../constants/Defaults";
import dealsCache from "../constants/CacheTimers";
import ContentBlock from "../components/ContentBlock";

function Home({ navigation }) {
  const { theme } = useTheme();
  const { deals, fetchTime, loading } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);
  const dispatch = useDispatch();

  const getUrlArray = useCallback(() => {
    let storesArray = savedStores;

    if (savedStores.length === 0) {
      storesArray = DEFAULT_STORES;
    }

    const urlArray = [];
    let count = 0;
    storesArray.map((item) => {
      if (count < 10 && item.isActive === 1) {
        urlArray.push(HOME_FILTER.replace(DELIM_ID, item.storeID));
        count += 1;
      }
      return item;
    });

    return urlArray;
  }, [savedStores]);

  const getStoreTitle = useCallback(
    (id) => {
      if (stores.length > 0) {
        const storeName = stores.find((item) => item.storeID === id);
        return storeName.storeName;
      }
      return null;
    },
    [stores]
  );

  useEffect(() => {
    const time = new Date();
    if (deals.length === 0 || fetchTime + dealsCache < time.getTime()) {
      dispatch(fetchDeals(getUrlArray()));
    }
  }, [deals, fetchTime, getUrlArray, dispatch]);

  const handleNavigate = useCallback(
    (storeId) => {
      navigation.navigate("StoreDeals", {
        storeId,
        name: getStoreTitle(storeId),
      });
    },
    [navigation, getStoreTitle]
  );

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "space-around",
          backgroundColor: theme.colors.grey5,
        }}
      >
        <View style={{ width: "100%" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ alignSelf: "center" }}>
            Getting the latest deals... Hold tight!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Button onPress={() => navigation.navigate("StoreDeals")}>
        Navigate
      </Button>
      <ContentBlock
        deals={deals}
        savedStores={savedStores}
        stores={stores}
        loading={loading}
        handleNavigate={handleNavigate}
      />
    </View>
  );
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

export default Home;
