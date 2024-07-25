import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useTheme } from "@rneui/themed";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import HeaderImage from "./HeaderImage";
import { dealListType } from "../propTypes/dealType";
import {
  TEXT_COLOUR_WHITE,
  INFO_BACKGROUND,
  TEXT_INACTIVE,
} from "../constants/Colours";

function LargeCard({ deal, handleDealNavigate }) {
  const { stores } = useSelector((state) => state.stores);
  const { theme } = useTheme();

  const store = stores.find((s) => s.storeID === deal.storeID);

  return (
    <Pressable
      onPress={() => handleDealNavigate(deal)}
      style={[styles.cardWrapper, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.headerImageContainer}>
        <HeaderImage
          steamAppID={deal.steamAppID}
          iconImage={store?.images.logo}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {deal.title}
          </Text>
          <Text>
            {deal.steamRatingText} ({deal.steamRatingPercent}%)
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <View
            style={[
              styles.savingsContainer,
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <Text>-{deal.savings.split(".")[0]}%</Text>
          </View>
          <View style={styles.priceValues}>
            <Text style={styles.normalPrice}>${deal.normalPrice}</Text>
            <Text style={styles.salePrice}>${deal.salePrice}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 2,
    marginTop: 9,
    overflow: "hidden",
  },
  headerImageContainer: {
    width: "100%",
    height: 160,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: INFO_BACKGROUND,
  },
  titleContainer: {
    flex: 7,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
    color: TEXT_COLOUR_WHITE,
  },
  priceContainer: {
    flex: 3,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  savingsContainer: {
    height: 21,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    alignItems: "flex-end",
    marginTop: 23,
  },
  priceValues: {
    flexDirection: "column",
    alignItems: "flex-end",
    color: TEXT_COLOUR_WHITE,
  },
  normalPrice: {
    color: TEXT_INACTIVE,
    fontSize: 15,
    paddingBottom: 2,
  },
  salePrice: {
    fontWeight: "700",
    fontSize: 15,
    color: TEXT_COLOUR_WHITE,
  },
});

LargeCard.propTypes = {
  deal: dealListType.isRequired,
  handleDealNavigate: PropTypes.func,
};

LargeCard.defaultProps = {
  handleDealNavigate: null,
};

export default LargeCard;
