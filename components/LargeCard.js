import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import PropTypes from "prop-types";
import HeaderImage from "./HeaderImage";

function LargeCard({ deal }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.cardWrapper, { backgroundColor: "#306187" }]}>
      <View style={{ width: "100%", height: 200 }}>
        <HeaderImage steamAppID={deal.steamAppID} />
      </View>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <View style={{ flex: 7 }}>
          <Text style={styles.title}>{deal.title}</Text>
          <Text>
            {deal.steamRatingText} ({deal.steamRatingPercent}%)
          </Text>
        </View>
        <View style={{ flex: 3, alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row" }}>
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
              <Text
                style={{
                  color: theme.colors.grey2,
                  fontSize: 15,
                  paddingBottom: 2,
                }}
              >
                ${deal.normalPrice}
              </Text>
              <Text style={{ fontWeight: "700", fontSize: 15 }}>
                ${deal.salePrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
  },
});
LargeCard.propTypes = {
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

export default LargeCard;
