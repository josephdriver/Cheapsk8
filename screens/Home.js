/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, Text, SearchBar } from "@rneui/themed";

import { setDeals, setLoading } from "../redux/dealsSlice";
import DEFAULT_STORES from "../constants/Defaults";
import { DEALS } from "../constants/Urls";
import dealsCache from "../constants/CacheTimers";
import ContentBlock from "../components/ContentBlock";
import useAxiosFetch from "../utilities/useAxiosFetch";
import Loading from "../components/Loading";
import { parseDeals } from "../utilities/dealsHelpers";

function Home({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { deals, fetchTime } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);

  const [fetch, setFetch] = useState(false);
  const [params, setParams] = useState({
    storeID:
      savedStores.length > 0
        ? savedStores.map((s) => s.storeID)
        : DEFAULT_STORES.map((s) => s.storeID),
    onSale: 1,
    sortBy: "reviews",
    desc: 0,
    AAA: 1,
    pageNumber: 0,
  });

  const { data, loading } = useAxiosFetch(
    `${DEALS}`,
    0,
    fetch,
    false,
    params,
    null
  );

  useEffect(() => {
    if (deals.length === 0 || fetchTime + dealsCache < new Date().getTime()) {
      setFetch(true);
    }
  }, [deals, fetchTime]);

  useEffect(() => {
    if (data) {
      setFetch(false);
      if (params.pageNumber === 0) {
        dispatch(setDeals(parseDeals(data)));
      }
    }
  }, [data, dispatch, params.pageNumber]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

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

  if (loading) {
    <Loading message="Getting the latest deals... Hold tight!" />;
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

      <View style={{ paddingBottom: 70 }}>
        <ContentBlock
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
