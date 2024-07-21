/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";

import FlatListItem from "./FlatListItem";

function ContentBlock({
  handleDealNavigate,
  handlePageIncrement,
  loading,
  pageNumber,
}) {
  const { theme } = useTheme();
  const { content } = useSelector((state) => state.deals);

  const renderFooter = useCallback(
    () => (
      <View>
        {loading && (
          <ActivityIndicator
            style={{ padding: 50 }}
            size="large"
            color={theme.colors.primary}
          />
        )}
      </View>
    ),
    [loading, theme.colors.primary]
  );

  if (content && content.length > 0) {
    return (
      <FlatList
        onEndReached={() => handlePageIncrement(pageNumber + 1)}
        onEndReachedThreshold={5}
        initialNumToRender={30}
        key={(item) => `${item.dealID}${item.storeID}`}
        data={content}
        renderItem={({ item }) => (
          <FlatListItem item={item} handleDealNavigate={handleDealNavigate} />
        )}
        ListFooterComponent={renderFooter}
      />
    );
  }
  return null;
}

export default ContentBlock;
