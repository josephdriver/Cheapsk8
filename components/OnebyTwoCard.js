import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import SmallCard from "./SmallCard";

function OneByTwoCard({ deals, handleDealNavigate }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {deals.map((item) => (
        <SmallCard
          key={item.thumb}
          deal={item}
          handleDealNavigate={handleDealNavigate}
        />
      ))}
    </View>
  );
}

OneByTwoCard.propTypes = {
  deals: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  handleDealNavigate: PropTypes.func,
};

OneByTwoCard.defaultProps = { handleDealNavigate: null };

export default OneByTwoCard;
