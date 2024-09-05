import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { View, Pressable, StyleSheet, Animated } from "react-native";
import { Text, useTheme } from "@rneui/themed";

import { TEXT_COLOUR_WHITE, INFO_BACKGROUND } from "../../constants/Colours";
import CapsuleImage from "../shared/CapsuleImage";
import { ANIMATED_CONFIG } from "../../constants/Defaults";

function ListItem({ item, handleOnPress }) {
  const [width, setWidth] = useState(null);
  const { theme } = useTheme();

  /**
   * Handle navigation to the deal screen
   */
  const handlePress = useCallback(
    () => handleOnPress(item),
    [item, handleOnPress]
  );

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

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={handlePress}
        style={styles.container}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
      >
        <Animated.View
          style={[
            styles.innerContainer,
            {
              backgroundColor: theme.colors.searchBg,
              opacity: animated,
              transform: [{ scale }],
            },
          ]}
        >
          <View style={styles.imageRowContainer}>
            <View
              style={styles.imageContainer}
              onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
            >
              {width && (
                <CapsuleImage
                  steamAppID={item.steamAppID}
                  title={item.external}
                  url={item.thumb}
                  width={width}
                />
              )}
            </View>
            <View style={styles.dealTextContainer}>
              <Text>Cheapest Deal</Text>
              <Text style={styles.dealTextStyle}>${item.cheapest}</Text>
            </View>
          </View>

          <View style={styles.gameTitleContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.gameTitleText}
            >
              {item.external}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 2,
  },
  innerContainer: {
    width: "100%",
    height: 100,
    flex: 1,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: { width: 180, height: 70 },

  dealTextContainer: {
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  dealTextStyle: {
    fontWeight: "700",
    fontSize: 15,
  },
  gameTitleContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: INFO_BACKGROUND,
  },
  gameTitleText: {
    color: TEXT_COLOUR_WHITE,
    paddingHorizontal: 5,
    fontWeight: "700",
  },
});

ListItem.propTypes = {
  item: PropTypes.shape({
    gameID: PropTypes.string.isRequired,
    steamAppID: PropTypes.string,
    cheapest: PropTypes.string.isRequired,
    thumb: PropTypes.string,
    external: PropTypes.string.isRequired,
  }).isRequired,
  handleOnPress: PropTypes.func.isRequired,
};

export default ListItem;
