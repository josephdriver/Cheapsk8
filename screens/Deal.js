/* eslint-disable react/prop-types */
import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Text, Divider } from "@rneui/themed";
import { useSelector } from "react-redux";

import useAxiosFetch from "../utilities/useAxiosFetch";
import { GAMES } from "../constants/Urls";
import HeaderImage from "../components/HeaderImage";
import DealItem from "../components/DealItem";
import Loading from "../components/Loading";

function Deal({ route, navigation }) {
  const { deal } = route.params;
  const { savedStores } = useSelector((state) => state.stores);
  const { theme } = useTheme();

  const { data, loading } = useAxiosFetch(
    `${GAMES}id=${deal.gameID}`,
    0,
    false,
    true,
    false,
    null
  );

  const store = useMemo(
    () =>
      savedStores.find(
        (s) => s.storeID.toString() === deal.storeID.toString()
      ) || [],
    [savedStores, deal.storeID]
  );

  const stores = useMemo(
    () => savedStores.filter((s) => s.storeID !== deal.storeID) || [],
    [savedStores, deal.storeID]
  );

  const handlePress = useCallback(
    (val) => {
      console.log(val);
      navigation.navigate("WebView", {
        url: val,
      });
    },
    [navigation]
  );

  if (loading) {
    return <Loading message="Getting the latest deals... Hold tight!" />;
  }
  if (!data) return null;

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <View style={{ width: "100%", height: 200 }}>
        <HeaderImage steamAppID={deal.steamAppID} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "#306187",
        }}
      >
        <Text style={styles.dealTitle}>{deal.title}</Text>
        <Text>
          {deal.steamRatingText} ({deal.steamRatingPercent}%)
        </Text>
      </View>
      <Divider />
      <DealItem deal={deal} store={store} handlePress={handlePress} />
      {data.deals
        .filter((d) => stores.some((s) => s.storeID.toString() === d.storeID))
        .map((d) => {
          const st = stores.find((s) => s.storeID.toString() === d.storeID);
          return (
            <DealItem
              key={d.dealID}
              deal={d}
              store={st}
              handlePress={handlePress}
            />
          );
        })}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  sectionHeading: {
    paddingVertical: 10,
  },
  storeWrapper: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    flex: 7,
  },
  dealTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
  },
  image: {
    flex: 1,
  },
});

export default Deal;
