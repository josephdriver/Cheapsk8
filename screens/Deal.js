import React, { useMemo, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useTheme, Text, Divider } from "@rneui/themed";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import axios from "axios";
import qs from "qs";

import useAxiosFetch from "../utilities/useAxiosFetch";
import { DEALS, GAMES } from "../constants/Urls";
import HeaderImage from "../components/HeaderImage";
import DealItem from "../components/DealItem";
import Loading from "../components/Loading";
import { METACRITIC_SCORES } from "../constants/Colours";
import { dealListType, gameListType } from "../propTypes/dealType";

function Deal({ route, navigation }) {
  const { deal } = route.params;
  const { stores, savedStores } = useSelector((state) => state.stores);
  const { theme } = useTheme();

  const [gameData, setGameData] = useState(deal);
  const [gameDataLoading, setGameDataLoading] = useState(false);

  const getParams = useMemo(() => ({ id: deal.gameID }), [deal]);
  const { data, loading } = useAxiosFetch(GAMES, 0, false, true, getParams);

  /**
   * HandlePress function to navigate to the WebView screen
   * @param {string} val - URL to navigate to
   */
  const handlePress = useCallback(
    (val) => {
      navigation.navigate("WebView", {
        url: val,
      });
    },
    [navigation]
  );

  /**
   * useEffect to fetch game data from the API
   * when the data is loaded, set the gameData state
   */
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

  /**
   * useMemo to convert the date from seconds to a readable format
   * @returns {string} - formatted date
   */
  const secondsToDate = useMemo(() => {
    if (!data) return null;

    const date = new Date(data.cheapestPriceEver.date * 1000);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString().substr(-2);
    return `${day}/${month}/${year}`;
  }, [data]);

  /**
   * useMemo to determine the colour of the metacritic score
   * @returns {string} - colour of the metacritic score
   */
  const metacriticScore = useMemo(() => {
    if (!gameData.gameInfo) return null;
    if (gameData.gameInfo.metacriticScore >= 80) {
      return METACRITIC_SCORES.GOOD;
    }
    if (gameData.gameInfo.metacriticScore >= 50) {
      return METACRITIC_SCORES.AVERAGE;
    }
    return METACRITIC_SCORES.BAD;
  }, [gameData]);

  /**
   * useMemo to determine the stores to display
   * @returns {array} - array of stores to display
   */
  const storesArray = useMemo(() => {
    if (savedStores.length > 0) {
      return savedStores;
    }
    return stores;
  }, [savedStores, stores]);

  /**
   * If the data is loading, display the loading component
   * If the data is not loaded, return null
   */
  if (!data || !gameData) return null;
  if (loading || gameDataLoading) {
    return <Loading message="Getting the latest deals... Hold tight!" />;
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Pressable onPress={() => console.log(data)} style={styles.iconContainer}>
        <Icon name="heart" color="white" size={35} style={styles.icon} />
      </Pressable>
      <View style={styles.imageContainer}>
        <HeaderImage
          steamAppID={gameData.gameInfo.steamAppID}
          isCap
          fallback={gameData.gameInfo.thumb}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.dealTitle}>{gameData.gameInfo.name}</Text>

        <View style={styles.info}>
          <View>
            <Text>
              {gameData.gameInfo.steamAppID
                ? `${gameData.gameInfo.steamRatingText} (${gameData.gameInfo.steamRatingPercent}%)`
                : ` `}
            </Text>
            <Text
              style={{
                color: metacriticScore,
              }}
            >
              {gameData.gameInfo.metacriticScore > 0
                ? `Metacritic Score ${gameData.gameInfo.metacriticScore}`
                : ` `}
            </Text>
            <Text>
              {gameData.gameInfo.publisher &&
                `Publisher: ${gameData.gameInfo.publisher}`}
            </Text>
          </View>
          <View style={styles.alignEnd}>
            <Text>Lowest Ever</Text>
            <Text>{`$${data.cheapestPriceEver.price}`}</Text>
            <Text>{secondsToDate}</Text>
          </View>
        </View>
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

Deal.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      deal: PropTypes.oneOfType([dealListType, gameListType]).isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  iconContainer: {
    zIndex: 1,
    position: "absolute",
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#306187",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: -4,
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#306187",
  },
  info: { flexDirection: "row", justifyContent: "space-between" },
  alignEnd: {
    alignItems: "flex-end",
  },
});
export default Deal;
