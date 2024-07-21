/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import LargeCard from "./LargeCard";
import OneByTwoCard from "./OneByTwoCard";

function FlatListItem({ item, handleDealNavigate }) {
  return (
    <View key={item.dealID} style={{ marginHorizontal: 10 }}>
      <View>
        {item.header ? (
          <LargeCard
            key={`${item.dealID}${item.storeID}`}
            deal={item.header}
            handleDealNavigate={handleDealNavigate}
          />
        ) : (
          <OneByTwoCard
            key={`${item.dealID}${item.storeID}`}
            deals={item.row}
            handleDealNavigate={handleDealNavigate}
          />
        )}
      </View>
    </View>
  );
}

export default FlatListItem;
