import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import LargeCapsule from "./LargeCapsule";

function SmallCard({ deal }) {
  const { theme } = useTheme();

  return (
    <View style={styles.cardWrapper}>
      <LargeCapsule steamAppID={deal.steamAppID} url={deal.thumb} />

      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: 8,
          paddingBottom: 3,
        }}
      >
        <View style={{ flex: 7 }}>
          <Text style={styles.title}>{deal.title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            paddingVertical: 3,
          }}
        >
          <View
            style={{
              height: 21,
              paddingHorizontal: 5,
              backgroundColor: theme.colors.secondary,
              marginHorizontal: 3,
            }}
          >
            <Text>-{deal.savings.split(".")[0]}%</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              ${deal.salePrice}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 16,
    width: "47.5%",
    backgroundColor: "#306187",
    borderRadius: 2,
    overflow: "hidden",
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    paddingBottom: 1,
  },
});

SmallCard.propTypes = {
  deal: PropTypes.shape({
    internalName: PropTypes.string,
    title: PropTypes.string,
    metacriticLink: PropTypes.string,
    dealID: PropTypes.string,
    storeID: PropTypes.string,
    gameID: PropTypes.string,
    salePrice: PropTypes.string,
    normalPrice: PropTypes.string,
    isOnSale: PropTypes.string,
    savings: PropTypes.string,
    metacriticScore: PropTypes.string,
    steamRatingText: PropTypes.string,
    steamRatingPercent: PropTypes.string,
    steamRatingCount: PropTypes.string,
    steamAppID: PropTypes.string,
    releaseDate: PropTypes.number,
    lastChange: PropTypes.number,
    dealRating: PropTypes.string,
    thumb: PropTypes.string,
  }).isRequired,
};

export default SmallCard;
