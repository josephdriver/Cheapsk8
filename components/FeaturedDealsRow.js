import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import LargeCard from "./LargeCard";
import { dealListType } from "../propTypes/props";
import SmallCard from "./SmallCard";

function FeaturedDealsRow({ item, handleDealNavigate }) {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <View>
        {item.header ? (
          <LargeCard
            deal={item.header}
            handleDealNavigate={handleDealNavigate}
          />
        ) : (
          <View style={styles.smallCard}>
            {item.row.map((i) => (
              <SmallCard
                key={`${i.dealID}${i.storeID}`}
                deal={i}
                handleDealNavigate={handleDealNavigate}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smallCard: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

FeaturedDealsRow.defaultProps = {
  item: {
    header: null,
    row: [],
  },
};

FeaturedDealsRow.propTypes = {
  item: PropTypes.shape({
    header: dealListType,
    row: PropTypes.arrayOf(dealListType),
  }),
  handleDealNavigate: PropTypes.func.isRequired,
};
export default FeaturedDealsRow;
