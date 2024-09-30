import React, { useMemo, useState } from "react";
import { View, StyleSheet, Pressable, Text, Animated } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import HeaderImage from "../shared/HeaderImage";
import { dealListType } from "../../propTypes/props";
import {
  WHITE,
  SECONDARY,
  TEXT_INACTIVE,
  DISCOUNT,
} from "../../constants/Colours";
import { ANIMATED_CONFIG } from "../../constants/Defaults";

function LargeCard({ deal, handleDealNavigate = null }) {
  const [width, setWidth] = useState(null);
  const { stores } = useSelector((state) => state.stores);

  const store = useMemo(
    () => stores.find((s) => s.storeID === deal.storeID),
    [stores, deal.storeID]
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
    <Pressable
      onPress={() => handleDealNavigate(deal)}
      style={styles.cardWrapper}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity: animated,
        }}
      >
        <View
          style={styles.headerImageContainer}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          {width && (
            <HeaderImage
              steamAppID={deal.steamAppID}
              iconImage={store?.images.logo}
              title={deal.title}
              width={width}
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {deal.title}
            </Text>
            <Text style={styles.rating}>
              {deal.steamRatingText} ({deal.steamRatingPercent}%)
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.savingsContainer}>
              <Text style={styles.percentDiscount}>
                -{deal.savings.split(".")[0]}%
              </Text>
            </View>
            <View style={styles.priceValues}>
              <Text style={styles.normalPrice}>${deal.normalPrice}</Text>
              <Text style={styles.salePrice}>${deal.salePrice}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 2,
    marginTop: 15,
    overflow: "hidden",
  },
  headerImageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: SECONDARY,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: SECONDARY,
  },
  titleContainer: {
    flex: 7,
  },
  rating: {
    color: WHITE,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
    color: WHITE,
  },
  priceContainer: {
    flex: 3,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingLeft: 10,
  },
  savingsContainer: {
    height: 21,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    alignItems: "flex-end",
    marginTop: 23,
    backgroundColor: DISCOUNT,
    color: WHITE,
  },
  percentDiscount: {
    color: WHITE,
  },
  priceValues: {
    flexDirection: "column",
    alignItems: "flex-end",
    color: WHITE,
  },
  normalPrice: {
    color: TEXT_INACTIVE,
    fontSize: 15,
    paddingBottom: 2,
    textDecorationLine: "line-through",
  },
  salePrice: {
    fontWeight: "700",
    fontSize: 15,
    color: WHITE,
  },
});

LargeCard.propTypes = {
  deal: dealListType.isRequired,
  handleDealNavigate: PropTypes.func,
};

export default LargeCard;
