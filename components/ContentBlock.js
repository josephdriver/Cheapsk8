/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import LargeCard from "./LargeCard";
import OneByTwoCard from "./OneByTwoCard";
import generateId from "../utilities/guidGenerator";

function ContentBlock({ handleDealNavigate }) {
  const { content } = useSelector((state) => state.deals);

  {
    /* const getStoreLogo = useCallback(
    (id) => {
      if (stores.length > 0) {
        const storeName = stores.find((item) => item.storeID === id);
        return storeName.images.logo;
      }
      return null;
    },
    [stores]
  ); */
  }

  const renderItem = useCallback(
    ({ item }) => (
      <View key={item.dealID} style={{ marginHorizontal: 10 }}>
        <View>
          {item.header ? (
            <LargeCard
              key={generateId()}
              deal={item.header}
              handleDealNavigate={handleDealNavigate}
            />
          ) : (
            <OneByTwoCard
              key={generateId()}
              deals={item.row}
              handleDealNavigate={handleDealNavigate}
            />
          )}
        </View>
      </View>
    ),
    [handleDealNavigate]
  );

  if (content && content.length > 0) {
    return (
      <FlatList
        key={(item) => item.storeID}
        data={content}
        renderItem={renderItem}
      />
    );
  }
  return null;
}

export default ContentBlock;
