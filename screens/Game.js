/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useEffect, useState, useCallback } from "react";
import analytics from "@react-native-firebase/analytics";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme, Divider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import axios from "axios";
import qs from "qs";

import { setFavourites } from "../redux/favouritesSlice";
import useAxiosFetch from "../utilities/useAxiosFetch";
import { DEALS, GAMES } from "../constants/Urls";
import HeaderImage from "../components/shared/HeaderImage";
import StoreOffer from "../components/game/StoreOffer";
import Loading from "../components/shared/Loading";
import { dealListType, gameListType } from "../propTypes/props";
import GameInfoContainer from "../components/game/GameInfoContainer";
import GameNotificationsSettings from "../components/game/GameNotificationsSettings";
import { WHITE, FAVOURITE_YELLOW } from "../constants/Colours";
import { ALERT_LEVELS, ANIMATED_CONFIG } from "../constants/Defaults";

function Game({ route, navigation }) {
  const { deal } = route.params;

  const { stores, savedStores } = useSelector((state) => state.stores);
  const { favourites } = useSelector((state) => state.favourites);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [width, setWidth] = useState(null);
  const [gameData, setGameData] = useState(deal);
  const [gameDataLoading, setGameDataLoading] = useState(false);

  const getParams = useMemo(() => ({ id: deal.gameID }), [deal]);
  const { data, loading } = useAxiosFetch(
    GAMES,
    0,
    false,
    true,
    getParams,
    null
  );

  useFocusEffect(
    React.useCallback(() => {
      analytics().logScreenView({
        screen_name: deal.title,
        screen_class: "Game",
      });
    }, [deal.title])
  );

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

  const animation = new Animated.Value(0);
  const animated = new Animated.Value(1);
  const scale = animation.interpolate(ANIMATED_CONFIG.SPRING_RANGE);
  const fadeIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      duration: ANIMATED_CONFIG.PRESS_DURATION.IN,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated, {
      toValue: ANIMATED_CONFIG.PRESS_OPACITY.IN,
      duration: ANIMATED_CONFIG.PRESS_DURATION.IN,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      duration: ANIMATED_CONFIG.PRESS_DURATION.OUT,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated, {
      toValue: ANIMATED_CONFIG.PRESS_OPACITY.OUT,
      duration: ANIMATED_CONFIG.PRESS_DURATION.OUT,
      useNativeDriver: true,
    }).start();
  };

  /**
   * useMemo to determine if the game is a favourite
   */
  const favourite = useMemo(() => {
    if (!favourites) return null;
    return (
      gameData &&
      gameData.gameInfo &&
      gameData.gameInfo.gameID &&
      favourites.find((f) => f.gameID === gameData.gameInfo.gameID)
    );
  }, [gameData, favourites]);

  const handleToggleFavourite = useCallback(() => {
    const newFavourite = {
      ...data,
      gameID: gameData.gameInfo.gameID,
      alertLevel: ALERT_LEVELS[1],
      activeAlert: false,
      lastSeen: new Date().getTime(),
    };
    const newFavourites = favourite
      ? favourites.filter((f) => f.gameID !== gameData.gameInfo.gameID)
      : [...favourites, newFavourite];

    analytics().logEvent(
      favourite ? "remove_from_favourites" : "add_to_favourites",
      {
        title: favourite ? favourite.info.title : newFavourite.info.title,
        game_id: favourite ? favourite.gameID : newFavourite.gameID,
        steam_id: favourite
          ? favourite.info.steamAppID
          : newFavourite.info.steamAppID,
      }
    );

    dispatch(setFavourites(newFavourites));
  }, [gameData, dispatch, favourites, favourite, data]);

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

  if (loading || gameDataLoading) {
    return <Loading message="Getting the latest deals... Hold tight!" />;
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      {data && gameData && (
        <>
          <Pressable
            onPress={() => handleToggleFavourite(gameData)}
            style={styles.iconContainer}
            onPressIn={fadeIn}
            onPressOut={fadeOut}
          >
            <Animated.View
              style={{ opacity: animated, transform: [{ scale }] }}
            >
              <Icon
                name="heart"
                color={favourite ? FAVOURITE_YELLOW : WHITE}
                size={35}
                style={styles.icon}
              />
            </Animated.View>
          </Pressable>
          <View
            style={styles.imageContainer}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          >
            {width && (
              <HeaderImage
                steamAppID={gameData.gameInfo.steamAppID}
                isCap
                fallback={gameData.gameInfo.thumb}
                title={gameData.gameInfo.name}
                width={width}
                height={200}
              />
            )}
          </View>
          <GameInfoContainer gameData={gameData} data={data} />
          <Divider />
          {favourite && (
            <GameNotificationsSettings
              gameData={gameData}
              favourite={favourite}
            />
          )}
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
                  <StoreOffer
                    key={d.dealID}
                    deal={d}
                    store={st}
                    handlePress={handlePress}
                    favourite={favourite}
                  />
                );
              })}
          </ScrollView>
        </>
      )}
    </View>
  );
}

Game.propTypes = {
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
    top: 265,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
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
});
export default Game;
