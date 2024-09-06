import React, { useCallback, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, SearchBar } from "@rneui/themed";

import { fetchDeals } from "../redux/dealsSlice";
import { DEALS_CACHE_OFFSET } from "../constants/Defaults";
import FeaturedDeals from "../components/home/FeaturedDeals";
import Loading from "../components/shared/Loading";
import {
  logScreenView,
  logEvent,
  SCREEN_CLASSES,
} from "../utilities/analytics";

function Home({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { deals, loading, offset, fetchTime } = useSelector(
    (state) => state.deals
  );
  const { savedStores, stores } = useSelector((state) => state.stores);

  const getParams = useMemo(
    () => ({
      storeID:
        savedStores.length > 0
          ? savedStores.map((s) => s.storeID)
          : stores.map((s) => s.storeID),
      onSale: 1,
      sortBy: "reviews",
      desc: 0,
      AAA: 1,
      pageNumber: offset || 0,
    }),
    [offset, savedStores, stores]
  );

  const triggerDealFetch = useCallback(() => {
    dispatch(fetchDeals(getParams));
  }, [dispatch, getParams]);

  useFocusEffect(
    React.useCallback(() => {
      if (
        deals.length === 0 ||
        fetchTime + DEALS_CACHE_OFFSET < new Date().getTime()
      ) {
        triggerDealFetch();
      }
    }, [triggerDealFetch, deals, fetchTime])
  );

  const handleDealNavigate = useCallback(
    (deal) => {
      navigation.navigate("Deal", {
        deal,
      });
      logScreenView({
        screen_name: deal.title,
        screen_class: SCREEN_CLASSES.GAME,
      });
      logEvent("view_deal", {
        game_id: deal.gameID,
        steam_id: deal.steamAppID,
        store_id: deal.storeID,
        game_title: deal.title,
      });
    },
    [navigation]
  );

  const handleSearchNavigate = useCallback(
    () => navigation.navigate("Search"),
    [navigation]
  );

  const handlePageIncrement = useCallback(() => {
    if (!loading) {
      dispatch(fetchDeals({ ...getParams, pageNumber: offset + 1 }, true));
    }
  }, [loading, dispatch, getParams, offset]);

  if (loading && !offset) {
    return <Loading message="Getting the latest deals... Hold tight!" />;
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Pressable
        onPress={() => {
          handleSearchNavigate();
          logScreenView({ screen_name: "Search", screen_class: "Search" });
        }}
      >
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
        <FeaturedDeals
          pageNumber={offset}
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
});

export default Home;
