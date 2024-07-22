import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";

import LargeCapsule from "./LargeCapsule";

function SmallCard({ deal, handleDealNavigate }) {
  const { theme } = useTheme();
  const { stores } = useSelector((state) => state.stores);

  const getStore = useMemo(
    () => stores.find((s) => s.storeID === deal.storeID),
    [stores, deal.storeID]
  );

  return (
    <Pressable
      onPress={() => handleDealNavigate(deal)}
      style={styles.cardWrapper}
    >
      <LargeCapsule
        steamAppID={deal.steamAppID}
        title={deal.title}
        url={deal.thumb}
        hasLogo={getStore.images.logo}
      />

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 3,
          paddingBottom: 3,
        }}
      >
        <View style={{ flex: 7 }}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {deal.title}
          </Text>
        </View>
        <View>
          <View
            style={{
              height: 21,
              backgroundColor: theme.colors.secondary,
              alignItems: "center",
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 9,
    width: "48.75%",
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
  handleDealNavigate: PropTypes.func,
};

SmallCard.defaultProps = { handleDealNavigate: null };
export default SmallCard;
