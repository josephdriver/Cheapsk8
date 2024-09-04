import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";

import CapsuleImage from "../shared/CapsuleImage";
import { dealListType } from "../../propTypes/props";
import {
  TEXT_COLOUR_WHITE,
  INFO_BACKGROUND,
  DISCOUNT_BOX,
} from "../../constants/Colours";

function SmallCard({ deal, handleDealNavigate = null }) {
  const { theme } = useTheme();
  const { stores } = useSelector((state) => state.stores);
  const store = stores.find((s) => s.storeID === deal.storeID);

  return (
    <Pressable
      onPress={() => handleDealNavigate(deal)}
      style={styles.cardWrapper}
    >
      <CapsuleImage
        steamAppID={deal.steamAppID}
        title={deal.title}
        url={deal.thumb}
        hasLogo={store.images.logo}
      />

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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 9,
    width: "48.75%",
    backgroundColor: INFO_BACKGROUND,
    borderRadius: 2,
    overflow: "hidden",
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingBottom: 3,
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
