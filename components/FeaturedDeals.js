/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";

import FeaturedDealsRow from "./FeaturedDealsRow";

function FeaturedDeals({
  handleDealNavigate,
  handlePageIncrement,
  loading,
  pageNumber,
}) {
  const { theme } = useTheme();
  const { content } = useSelector((state) => state.deals);
  const LARGE = "large";

  /**
   * Render the footer component
   * Display an ActivityIndicator if loading
   */
  const renderFooter = useCallback(
    () => (
      <View>
        {loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={LARGE}
            color={theme.colors.primary}
          />
        )}
      </View>
    ),
    [loading, theme.colors.primary]
  );

  return (
    <FlatList
      onEndReached={() => handlePageIncrement(pageNumber + 1)}
      onEndReachedThreshold={5}
      initialNumToRender={40}
      maxToRenderPerBatch={40}
      key={(item) => `${item.dealID}${item.storeID}`}
      data={content}
      renderItem={({ item }) => (
        <FeaturedDealsRow item={item} handleDealNavigate={handleDealNavigate} />
      )}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  activityIndicator: { padding: 50 },
});

export default FeaturedDeals;
