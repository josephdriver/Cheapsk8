import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { View, Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";

import { TEXT_COLOUR_WHITE, INFO_BACKGROUND } from "../../constants/Colours";
import CapsuleImage from "../shared/CapsuleImage";

function ListItem({ item, handleOnPress }) {
  const { theme } = useTheme();

  /**
   * Handle navigation to the deal screen
   */
  const handlePress = useCallback(
    () => handleOnPress(item),
    [item, handleOnPress]
  );

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          { backgroundColor: theme.colors.searchBg },
        ]}
      >
        <View style={styles.imageRowContainer}>
          <View style={styles.imageContainer}>
            <CapsuleImage
              steamAppID={item.steamAppID}
              title={item.external}
              url={item.thumb}
            />
          </View>
          <View style={styles.dealTextContainer}>
            <Text>Cheapest Deal</Text>
            <Text style={styles.dealTextStyle}>${item.cheapest}</Text>
          </View>
        </View>

        <View style={styles.gameTitleContainer}>
          <Text style={styles.gameTitleText}>{item.external}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
