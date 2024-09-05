import React, { useMemo, useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { func } from "prop-types";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";

import { BASE } from "../../constants/Urls";
import { favouriteType } from "../../propTypes/props";
import CapsuleImage from "../shared/CapsuleImage";
import {
  TEXT_COLOUR_WHITE,
  INFO_BACKGROUND,
  FAVOURITE_YELLOW,
  DISCOUNT_BOX,
} from "../../constants/Colours";
import { ANIMATED_CONFIG } from "../../constants/Defaults";

function ListItem({ item, handleOnPress }) {
  const [width, setWidth] = useState(null);
  const { stores } = useSelector((state) => state.stores);
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
    let lowestDeal = item.deals[0];
    let dealCount = 0;
    item.deals.forEach((d) => {
      if (parseFloat(d.price) < parseFloat(currentLow)) {
        lowestDeal = d;
      }
      if (d.savings > 0) {
        dealCount += 1;
      }
    });

    const store = stores.find((s) => s.storeID === lowestDeal.storeID);

    return { deal: lowestDeal, store, dealCount };
  }, [item, stores]);
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
              borderRightColor: alerts.isAlert
                ? FAVOURITE_YELLOW
                : "transparent",
              borderRightWidth: alerts.isAlert ? 7 : 0,
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
                  steamAppID={item.info.steamAppID}
                  title={item.info.title}
                  url={item.info.thumb}
                  width={width}
                />
              )}
            </View>

            <View>
              <View
                style={[
                  styles.priceContainer,
                  {
                    paddingRight: alerts.isAlert ? 5 : 10,
                  },
                ]}
              >
                {parseInt(currentLow.deal.savings, 10) > 0 && (
                  <View style={styles.discountPercent}>
                    <Text>-{currentLow.deal.savings.split(".")[0]}%</Text>
                  </View>
                )}
                <View style={{ height: 21 }}>
                  <Text>${currentLow.deal.price}</Text>
                </View>
              </View>
              <View
                style={{
                  paddingRight: alerts.isAlert ? 5 : 10,
                  paddingBottom: 5,
                }}
              >
                {currentLow.dealCount > 1 && (
                  <Text>+{currentLow.dealCount} more offers</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.gameTitleContainer}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.gameTitleText}>{item.info.title}</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingRight: alerts.isAlert ? 5 : 10,
                alignItems: "flex-end",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {alerts.isLowest && (
                  <Text style={styles.alertText}>Lowest Ever</Text>
                )}
                {currentLow.store && (
                  <Image
                    style={styles.iconImage}
                    source={{
                      uri: `${BASE}/${currentLow.store.images.logo}`,
                    }}
                  />
                )}
              </View>
            </View>
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
  priceContainer: {
    flex: 1,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
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
    flexDirection: "row",
    backgroundColor: INFO_BACKGROUND,
    alignItems: "center",
  },
  gameTitleText: {
    color: TEXT_COLOUR_WHITE,
    paddingHorizontal: 5,
    fontWeight: "700",
  },
  iconImage: {
    opacity: 0.9,
    marginLeft: 5,
    width: 24,
    height: 24,
  },
  alertText: {
    color: FAVOURITE_YELLOW,
    fontWeight: "700",
  },
});

ListItem.propTypes = {
  item: favouriteType.isRequired,
  handleOnPress: func.isRequired,
};

export default ListItem;
