import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { Divider, Slider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { TEXT_COLOUR_WHITE, FAVOURITE_YELLOW } from "../../constants/Colours";
import { ALERT_LEVELS } from "../../constants/Defaults";
import { setFavourites } from "../../redux/favouritesSlice";
import { dealType, dealListType } from "../../propTypes/props";

function AlertSlider({ value, onValueChange }) {
  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      maximumValue={Object.keys(ALERT_LEVELS).length}
      minimumValue={1}
      step={1}
      allowTouchTrack
      minimumTrackTintColor={FAVOURITE_YELLOW}
      trackStyle={styles.trackStyle}
      thumbStyle={styles.thumbStyle}
    />
  );
}

function GameNotificationsSettings({ gameData }) {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.favourites);

  const favourite = useMemo(
    () => favourites.find((f) => f.gameID === gameData.gameInfo.gameID),
    [favourites, gameData]
  );

  const handleValueChange = useCallback(
    (value) => {
      const filteredFavourites = favourites.filter(
        (f) => f.gameID !== gameData.gameInfo.gameID
      );
      dispatch(
        setFavourites([
          ...filteredFavourites,
          {
            ...favourite,
            alertLevel: ALERT_LEVELS[value],
            activeAlert: false,
            lastSeen: new Date().getTime(),
          },
        ])
      );
    },
    [dispatch, favourite, favourites, gameData]
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
    color: TEXT_COLOUR_WHITE,
  },
  label: {
    color: TEXT_COLOUR_WHITE,
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
    backgroundColor: FAVOURITE_YELLOW,
  },
  trackStyle: { height: 5, backgroundColor: TEXT_COLOUR_WHITE },
});

AlertSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

GameNotificationsSettings.propTypes = {
  gameData: PropTypes.oneOfType([dealType, dealListType]).isRequired,
};

export default GameNotificationsSettings;
