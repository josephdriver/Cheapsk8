import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";

import CapsuleImage from "./CapsuleImage";
import { dealListType } from "../propTypes/props";
import { TEXT_COLOUR_WHITE, INFO_BACKGROUND } from "../constants/Colours";

function SmallCard({ deal, handleDealNavigate }) {
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
        <View style={{ flex: 7 }}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {deal.title}
          </Text>
        </View>
        <View>
          <View
            style={[
              styles.priceContainer,
              { backgroundColor: theme.colors.grey3 },
            ]}
          >
            <Text>-{deal.savings.split(".")[0]}%</Text>
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
  title: {
    fontWeight: "700",
    fontSize: 15,
    paddingBottom: 1,
    color: TEXT_COLOUR_WHITE,
  },
  priceContainer: {
    height: 21,
    alignItems: "center",
  },
  price: {
    fontWeight: "700",
    fontSize: 15,
  },
});

SmallCard.propTypes = {
  deal: dealListType.isRequired,
  handleDealNavigate: PropTypes.func,
};

SmallCard.defaultProps = { handleDealNavigate: null };
export default SmallCard;
