import React, { useCallback, useMemo } from "react";
import { number, func, bool } from "prop-types";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";

import FeaturedDealsRow from "./FeaturedDealsRow";
import { LARGE_SPINNER } from "../../constants/Defaults";
import EmptyList from "../shared/EmptyList";

function FeaturedDeals({
  handleDealNavigate,
  handlePageIncrement,
  loading,
  pageNumber,
}) {
  const { theme } = useTheme();
  const { content } = useSelector((state) => state.deals);

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
            size={LARGE_SPINNER}
            color={theme.colors.primary}
          />
        )}
      </View>
    ),
    [loading, theme.colors.primary]
  );

  const emptyMessage = useMemo(
    () =>
      loading
        ? ""
        : "There has been an problem getting the latest deals. Please try again later.",
    [loading]
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
      ListEmptyComponent={<EmptyList message={emptyMessage} />}
    />
  );
}

const styles = StyleSheet.create({
  activityIndicator: { padding: 50 },
});
FeaturedDeals.propTypes = {
  handlePageIncrement: func.isRequired,
  handleDealNavigate: func.isRequired,
  loading: bool,
  pageNumber: number,
};

export default FeaturedDeals;
