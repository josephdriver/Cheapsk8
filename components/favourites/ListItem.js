import React, { useMemo, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { func } from "prop-types";
import { useTheme } from "@rneui/themed";

import { favouriteType } from "../../propTypes/props";
import CapsuleImage from "../shared/CapsuleImage";
import { TEXT_COLOUR_WHITE, INFO_BACKGROUND } from "../../constants/Colours";

function ListItem({ item, handleOnPress }) {
  const { theme } = useTheme();

  const alerts = useMemo(() => {
    let isLowest = false;
    let isAlert = false;
    item.deals.forEach((d) => {
      if (parseFloat(d.price) <= parseFloat(item.cheapestPriceEver.price)) {
        isLowest = true;
      }

      if (parseFloat(d.savings) >= parseFloat(item.alertLevel.threshold)) {
        isAlert = true;
      }
    });
    return { isLowest, isAlert };
  }, [item]);

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
              steamAppID={item.info.steamAppID}
              title={item.info.title}
              url={item.info.thumb}
            />
          </View>
          <View style={styles.dealTextContainer}>
            <Text>{alerts.isLowest ? "Cheapest Deal" : "Just a deal"}</Text>
            <Text>
              {alerts.isAlert ? "Meets Alert Criteria" : "Not good enough"}
            </Text>
            <Text style={styles.dealTextStyle}>${item.cheapest}</Text>
          </View>
        </View>

        <View style={styles.gameTitleContainer}>
          <Text style={styles.gameTitleText}>{item.info.title}</Text>
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
  item: favouriteType.isRequired,
  handleOnPress: func.isRequired,
};

export default ListItem;
