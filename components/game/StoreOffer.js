import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { Text, Divider } from "@rneui/themed";

import IconImage from "../shared/IconImage";
import { dealPropTypes, storeType } from "../../propTypes/props";
import { DISCOUNT_BOX } from "../../constants/Colours";
import { ANIMATED_CONFIG } from "../../constants/Defaults";

function StoreOffer({ deal, store, handlePress }) {
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
    <View key={deal.storeID}>
      <Pressable
        onPress={() => handlePress(deal.dealID)}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
      >
        <Animated.View
          style={[
            styles.dealContainer,
            { opacity: animated, transform: [{ scale }] },
          ]}
          key={deal.storeID}
        >
          <View style={{ flex: 1 }}>
            <IconImage url={store.images.logo} width={24} height={24} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.dealTitle}>{store.storeName}</Text>
          </View>
          <View
            style={[
              styles.priceContainer,
              {
                justifyContent:
                  parseInt(deal.savings, 10) > 0 ? "space-between" : "flex-end",
              },
            ]}
          >
            {parseInt(deal.savings, 10) > 0 && (
              <View style={styles.discountPercent}>
                <Text>-{deal.savings.split(".")[0]}%</Text>
              </View>
            )}
            <View>
              <Text style={styles.price}>${deal.price || deal.salePrice}</Text>
            </View>
          </View>
        </Animated.View>
        <Divider />
      </Pressable>
    </View>
  );
}

StoreOffer.propTypes = {
  deal: dealPropTypes.isRequired,
  store: storeType.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  dealContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  titleContainer: {
    flex: 7,
  },
  dealTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
  },
  priceContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  discountPercent: {
    height: 21,
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: DISCOUNT_BOX,
  },
  price: {
    fontWeight: "700",
    fontSize: 15,
  },
});

export default StoreOffer;
