/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, SearchBar } from "@rneui/themed";

import { fetchDeals } from "../redux/dealsSlice";
import DEFAULT_STORES from "../constants/Defaults";
import dealsCache from "../constants/CacheTimers";
import ContentBlock from "../components/ContentBlock";
import Loading from "../components/Loading";

function Home({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { deals, loading, fetchTime } = useSelector((state) => state.deals);
  const { savedStores } = useSelector((state) => state.stores);

  const [params, setParams] = useState({
    storeID:
      savedStores.length > 0
        ? savedStores.map((s) => s.storeID)
        : DEFAULT_STORES.map((s) => s.storeID),
    onSale: 1,
    sortBy: "reviews",
    desc: 0,
    AAA: 1,
    pageNumber:
      Math.floor((deals.length - 1) / 60) >= 0
        ? Math.floor((deals.length - 1) / 60)
        : 0,
  });

  const triggerDealFetch = useCallback(() => {
    console.log("In trigger deal fetch");
    dispatch(fetchDeals(params));
  }, [dispatch, params]);

  useEffect(() => {
    console.log(fetchTime + dealsCache);
    console.log(new Date().getTime());
    if (fetchTime + dealsCache < new Date().getTime()) {
      console.log("expired");
    }
    console.log();
    if (deals.length === 0 || fetchTime + dealsCache < new Date().getTime()) {
      console.log("In init fetch use effect");
      triggerDealFetch();
    }
  }, [triggerDealFetch, deals, fetchTime]);

  const handleDealNavigate = useCallback(
    (deal) => {
      navigation.navigate("Deal", {
        deal,
      });
    },
    [navigation]
  );

  const handleSearchNavigate = useCallback(
    () => navigation.navigate("Search"),
    [navigation]
  );

  const handlePageIncrement = useCallback(
    (pageNumber) => {
      if (!loading) {
        setParams((prevState) => ({ ...prevState, pageNumber }));
        dispatch(fetchDeals({ ...params, pageNumber }, true));
      }
    },
    [loading, dispatch, params, setParams]
  );

  if (loading && params.pageNumber === 0) {
    return <Loading message="Getting the latest deals... Hold tight!" />;
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Pressable onPress={() => handleSearchNavigate()}>
        <SearchBar
          placeholder="Find a game"
          round={2}
          editable={false}
          containerStyle={{
            backgroundColor: theme.colors.grey5,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
        />
      </Pressable>

      <View style={{ paddingBottom: 80 }}>
        <ContentBlock
          pageNumber={params.pageNumber}
          handlePageIncrement={handlePageIncrement}
          deals={deals}
          loading={loading}
          handleDealNavigate={handleDealNavigate}
        />
      </View>
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
