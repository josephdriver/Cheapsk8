import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { Text } from "@rneui/themed";
import { useSelector } from "react-redux";

import CapsuleImage from "../shared/CapsuleImage";
import { dealListType } from "../../propTypes/props";
import {
  TEXT_COLOUR_WHITE,
  INFO_BACKGROUND,
  DISCOUNT_BOX,
} from "../../constants/Colours";
import { ANIMATED_CONFIG } from "../../constants/Defaults";

function SmallCard({ deal, handleDealNavigate = null }) {
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
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={{
          transform: [{ scale }],
          opacity: animated,
        }}
      >
        {width && (
          <CapsuleImage
            steamAppID={deal.steamAppID}
            title={deal.title}
            url={deal.thumb}
            hasLogo={store.images.logo}
            width={width}
          />
        )}

        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {deal.title}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.discountContainer}>
              <Text style={styles.percentDiscount}>
                -{deal.savings.split(".")[0]}%
              </Text>
            </View>
            <View>
              <Text style={styles.price}>${deal.salePrice}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 9,
    width: "48.75%",
    borderRadius: 2,
    overflow: "hidden",
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingBottom: 3,
    backgroundColor: INFO_BACKGROUND,
  },
  titleContainer: {
    flex: 7,
    justifyContent: "flex-start",
    paddingHorizontal: 3,
  },
  priceContainer: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    paddingVertical: 1,
    color: TEXT_COLOUR_WHITE,
  },
  discountContainer: {
    height: 21,
    alignItems: "center",
    backgroundColor: DISCOUNT_BOX,
  },
  percentDiscount: {
    color: TEXT_COLOUR_WHITE,
  },
  price: {
    fontWeight: "700",
    fontSize: 15,
    color: TEXT_COLOUR_WHITE,
  },
});

SmallCard.propTypes = {
  deal: dealListType.isRequired,
  handleDealNavigate: PropTypes.func,
};

export default SmallCard;
