import React, { useMemo, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { func } from "prop-types";
import { useTheme } from "@rneui/themed";

import { favouriteType } from "../../propTypes/props";
import CapsuleImage from "../shared/CapsuleImage";
import {
  TEXT_COLOUR_WHITE,
  INFO_BACKGROUND,
  FAVOURITE_YELLOW,
  DISCOUNT_BOX,
} from "../../constants/Colours";

function ListItem({ item, handleOnPress }) {
  const { theme } = useTheme();

  const alerts = useMemo(() => {
    let isLowest = false;
    let isAlert = false;
    item.deals.forEach((d) => {
      if (parseFloat(d.price) <= parseFloat(item.cheapestPriceEver.price)) {
        isLowest = true;
      }
      if (
        parseFloat(100 - d.savings) >= parseFloat(item.alertLevel.threshold) ||
        (item.alertLevel.threshold === "anyDiscount" &&
          parseFloat(d.savings) > 0)
      ) {
        isAlert = true;
      }
    });
    return { isLowest, isAlert };
  }, [item]);

  const currentLow = useMemo(() => {
    let currentLow = item.deals[0];
    item.deals.forEach((d) => {
      if (parseFloat(d.price) < parseFloat(currentLow)) {
        currentLow = d;
      }
    });
    return currentLow;
  }, [item]);

  /**
   * Handle navigation to the deal screen
   */
  const handlePress = useCallback(
    () => handleOnPress(item),
    [item, handleOnPress]
  );

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress} style={styles.container}>
        <View
          style={[
            styles.innerContainer,
            {
              backgroundColor: theme.colors.searchBg,

              borderRightColor: alerts.isAlert
                ? FAVOURITE_YELLOW
                : "transparent",
              borderRightWidth: alerts.isAlert ? 7 : 0,
            },
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

            <View>
              <View style={{ paddingVertical: 5 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.gameTitleText, { color: FAVOURITE_YELLOW }]}
                >
                  {alerts.isLowest ? "Lowest Price Ever" : ""}
                </Text>
              </View>
              <View
                style={[
                  styles.priceContainer,
                  {
                    justifyContent: "flex-end",
                    paddingRight: alerts.isAlert ? 5 : 10,
                  },
                ]}
              >
                {parseInt(currentLow.savings, 10) > 0 && (
                  <View style={styles.discountPercent}>
                    <Text>-{currentLow.savings.split(".")[0]}%</Text>
                  </View>
                )}
                <View>
                  <Text>${currentLow.price}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.gameTitleContainer}>
            <Text style={styles.gameTitleText}>{item.info.title}</Text>
          </View>
        </View>
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
  priceContainer: {
    flex: 1,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  discountPercent: {
    height: 21,
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: DISCOUNT_BOX,
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
