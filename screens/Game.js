/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useEffect, useState, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";
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
import { Divider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import axios from "axios";
import qs from "qs";
import Toast from "react-native-toast-message";

import { setFavourites } from "../redux/favouritesSlice";
import useAxiosFetch from "../utilities/useAxiosFetch";
import { DEALS, GAMES } from "../constants/Urls";
import HeaderImage from "../components/shared/HeaderImage";
import StoreOffer from "../components/game/StoreOffer";
import Loading from "../components/shared/Loading";
import { dealListType, gameListType } from "../propTypes/props";
import GameInfoContainer from "../components/game/GameInfoContainer";
import GameNotificationsSettings from "../components/game/GameNotificationsSettings";
import { WHITE, FAVOURITE, BACKGROUND_PRIMARY } from "../constants/Colours";
import { ALERT_LEVELS, ANIMATED_CONFIG, HEADERS } from "../constants/Defaults";
import { getGameReferenceValues, getAlertTime } from "../utilities/dealAlerts";

function Game({ route, navigation }) {
  const { deal } = route.params;

  const { stores, savedStores } = useSelector((state) => state.stores);
  const { user } = useSelector((state) => state.user);
  const { favourites } = useSelector((state) => state.favourites);

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
      analytics().logEvent("redirect_to_store", {
        ...val,
        game_id: gameData.gameInfo.gameID,
        game_name: gameData.gameInfo.name,
        steam_id: gameData.gameInfo.steamAppID,
        user_id: user.uid,
      });

      navigation.navigate("WebView", {
        url: val.dealID,
        storeId: val.storeID,
      });
    },
    [navigation, gameData.gameInfo, user]
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
        headers: HEADERS,
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

  // Animated values for the favourite icon
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
    if (!favourites || favourites.length === 0) return null;
    return (
      gameData &&
      gameData.gameInfo &&
      gameData.gameInfo.gameID &&
      favourites.find((f) => f.gameId === gameData.gameInfo.gameID)
    );
  }, [gameData, favourites]);

  const handleToggleFavourite = useCallback(() => {
    if (!favourite && favourites && favourites.length > 25) {
      return Toast.show({
        type: "error",
        text1: "Maximum number of Titles have been added to your watch list.",
      });
    }

    const fetchTime = new Date().getTime();
    const { highestPercent, lowestPrice, lowestStoreId } =
      getGameReferenceValues(data.deals);

    const newFavourite = {
      gameId: gameData.gameInfo.gameID,
      title: gameData.gameInfo.name,
      thumb: data.info.thumb,
      steamId: gameData.gameInfo.steamAppID,
      alertLevel: ALERT_LEVELS[1],
      dealCount: data.deals.length,
      lowestStoreId,
      highestPercent,
      lowestPrice,
      lowestPriceEver: data.cheapestPriceEver.price,
      lowestPriceEverDate: data.cheapestPriceEver.date,
      fetchTime,
      lastSeen: fetchTime,
      alertTime: getAlertTime(
        lowestPrice,
        data.cheapestPriceEver.price,
        highestPercent,
        null,
        ALERT_LEVELS[1]
      ),
    };

    const newFavourites = favourite
      ? favourites.filter((f) => f.gameId !== gameData.gameInfo.gameID)
      : [...favourites, newFavourite];

    analytics().logEvent(
      favourite ? "remove_from_favourites" : "add_to_favourites",
      {
        title: favourite ? favourite.title : newFavourite.title,
        gameId: favourite ? favourite.gameId : newFavourite.gameId,
        steamId: favourite ? favourite.steamAppID : newFavourite.steamAppID,
      }
    );

    firestore().collection("watchLists").doc(user.uid).set({
      favourites: newFavourites,
    });

    return dispatch(setFavourites(newFavourites));
  }, [gameData, dispatch, favourites, favourite, data, user.uid]);

  // useEffect to update the favourite in the database
  useEffect(() => {
    if (favourite && data) {
      const newFavourites = favourites.map((f) => {
        if (f.gameId === favourite.gameId) {
          const fetchTime = new Date().getTime();
          const { highestPercent, lowestPrice, lowestStoreId } =
            getGameReferenceValues(data.deals);
          return {
            ...f,
            highestPercent,
            lowestPrice,
            lowestStoreId,
            lowestPriceEver: data.cheapestPriceEver.price,
            lowestPriceEverDate: data.cheapestPriceEver.date,
            lastSeen: fetchTime,
            fetchTime,
            alertTime: getAlertTime(
              lowestPrice,
              f.lowestPriceEver,
              highestPercent,
              f.alertTime,
              f.alertLevel
            ),
          };
        }
        return f;
      });

      firestore().collection("watchLists").doc(user.uid).set({
        favourites: newFavourites,
      });
    }
  }, [favourites, favourite, data, user.uid]);

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
    <View style={styles.view}>
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
                color={favourite ? FAVOURITE : WHITE}
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
            {data.deals.map((d) => (
              <StoreOffer
                key={d.dealID}
                deal={d}
                store={stores.find((s) => s.storeID.toString() === d.storeID)}
                handlePress={handlePress}
                favourite={favourite}
              />
            ))}
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
    backgroundColor: BACKGROUND_PRIMARY,
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
