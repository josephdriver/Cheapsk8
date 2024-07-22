/* eslint-disable react/prop-types */
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, Text, Divider } from "@rneui/themed";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import useAxiosFetch from "../utilities/useAxiosFetch";
import { DEALS, GAMES } from "../constants/Urls";
import HeaderImage from "../components/HeaderImage";
import DealItem from "../components/DealItem";
import Loading from "../components/Loading";

function Deal({ route, navigation }) {
  const { deal } = route.params;
  const { stores, savedStores } = useSelector((state) => state.stores);
  const { theme } = useTheme();

  const [gameData, setGameData] = useState(deal);
  const [gameDataLoading, setGameDataLoading] = useState(false);

  const getParams = useMemo(() => ({ id: deal.gameID }), [deal]);
  const { data, loading } = useAxiosFetch(GAMES, 0, false, true, getParams);

  const handlePress = useCallback(
    (val) => {
      navigation.navigate("WebView", {
        url: val,
      });
    },
    [navigation]
  );

  useEffect(() => {
    if (data && data.deals.length > 0) {
      setGameDataLoading(true);
      const steam = stores.find((s) => s.storeID);

      const sDeal =
        data.deals.find((s) => s.storeID === steam.storeID.toString()) ||
        data.deals[0];

      const params = { id: sDeal.dealID };

      const api = axios.create({
        baseURL: DEALS,
        withCredentials: false,
        params,
        paramsSerializer: (p) => qs.stringify(p, { encode: false }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      api
        .get()
        .then((response) => {
          setGameData(response.data);
          setGameDataLoading(false);
        })
        .catch(() => {
          setGameDataLoading(false);
        });
    }
  }, [data, stores]);

  const storesArray = useMemo(() => {
    if (savedStores.length > 0) {
      return savedStores;
    }
    return stores;
  }, [savedStores, stores]);

  if (loading || gameDataLoading) {
    return <Loading message="Getting the latest deals... Hold tight!" />;
  }
  if (!data || !gameData) return null;

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <View style={{ width: "100%", height: 200 }}>
        <HeaderImage
          steamAppID={gameData.gameInfo.steamAppID}
          isCap
          fallback={gameData.gameInfo.thumb}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "#306187",
        }}
      >
        <Text style={styles.dealTitle}>{gameData.gameInfo.name}</Text>
        {gameData.gameInfo.steamAppID ? (
          <View>
            <Text>
              {gameData.gameInfo.steamRatingText} (
              {gameData.gameInfo.steamRatingPercent}%)
            </Text>
          </View>
        ) : (
          <View>
            <Text>{` `}</Text>
          </View>
        )}
      </View>
      <Divider />
      <ScrollView>
        {data.deals
          .filter((d) =>
            storesArray.some((s) => s.storeID.toString() === d.storeID)
          )
          .map((d) => {
            const st = storesArray.find(
              (s) => s.storeID.toString() === d.storeID
            );
            return (
              <DealItem
                key={d.dealID}
                deal={d}
                store={st}
                handlePress={handlePress}
              />
            );
          })}
      </ScrollView>
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
