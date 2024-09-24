/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import firestore from "@react-native-firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Divider, Slider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { WHITE, FAVOURITE } from "../../constants/Colours";
import { ALERT_LEVELS } from "../../constants/Defaults";
import { setFavourites } from "../../redux/favouritesSlice";
import { dealType, dealListType, favouriteType } from "../../propTypes/props";
import { getAlertTime } from "../../utilities/dealAlerts";

function AlertSlider({ value, onValueChange }) {
  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      maximumValue={Object.keys(ALERT_LEVELS).length}
      minimumValue={1}
      step={1}
      allowTouchTrack
      minimumTrackTintColor={FAVOURITE}
      trackStyle={styles.trackStyle}
      thumbStyle={styles.thumbStyle}
    />
  );
}

function GameNotificationsSettings({ gameData, favourite }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { favourites } = useSelector((state) => state.favourites);
  const [notify, setNotify] = useState(null);
  const [debouncedNotify, setDebouncedNotify] = useState(null);

  useEffect(() => {
    const delayedInputTimeoutId = setTimeout(() => {
      setDebouncedNotify(notify);
    }, 1000);
    return () => clearTimeout(delayedInputTimeoutId);
  }, [notify]);

  useEffect(() => {
    if (debouncedNotify) {
      firestore().collection("watchLists").doc(user.uid).set({
        favourites: debouncedNotify,
        refetch: false,
      });
    }
  }, [debouncedNotify, user.uid]);

  const handleNotificationChange = useCallback((event) => {
    setNotify(event);
  }, []);

  const handleValueChange = useCallback(
    (value) => {
      const filteredFavourites = favourites.filter(
        (f) => f.gameId !== gameData.gameInfo.gameID
      );

      const newFavourites = [
        ...filteredFavourites,
        {
          ...favourite,
          alertLevel: ALERT_LEVELS[value],
          alertTime: getAlertTime(
            favourite.lowestPrice,
            favourite.lowestPriceEver,
            favourite.highestPercent,
            favourite.alertTime,
            ALERT_LEVELS[value]
          ),
          lastSeen: new Date().getTime(),
        },
      ];
      dispatch(setFavourites(newFavourites));
      handleNotificationChange(newFavourites);
    },
    [dispatch, favourite, favourites, gameData, handleNotificationChange]
  );

  if (!favourite) return null;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Get notified when:</Text>

        <Text style={styles.label}>
          {ALERT_LEVELS[favourite.alertLevel.id].label}
        </Text>

        <View style={styles.settingsContainer}>
          <View style={styles.sliderContainer}>
            <AlertSlider
              value={favourite.alertLevel.id}
              onValueChange={handleValueChange}
            />
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    alignSelf: "center",
    paddingVertical: 5,
    fontWeight: "700",
    fontSize: 18,
    color: WHITE,
  },
  label: {
    color: WHITE,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "700",
  },
  settingsContainer: {
    flexDirection: "column",
  },
  sliderContainer: { marginHorizontal: 10 },
  optionsText: {
    flex: 2,
  },
  rowPadding: {
    paddingVertical: 10,
  },
  thumbStyle: {
    height: 30,
    width: 30,
    backgroundColor: FAVOURITE,
  },
  trackStyle: { height: 5, backgroundColor: WHITE },
});

AlertSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

GameNotificationsSettings.propTypes = {
  gameData: PropTypes.oneOfType([dealType, dealListType]).isRequired,
  favourite: favouriteType.isRequired,
};

export default GameNotificationsSettings;
