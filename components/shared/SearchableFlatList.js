import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useTheme, SearchBar } from "@rneui/themed";
import {
  oneOfType,
  arrayOf,
  string,
  func,
  bool,
  elementType,
} from "prop-types";
import { favouriteType, gameListType } from "../../propTypes/props";

function SearchableFlatList({
  inputValue,
  handleInputChange,
  data,
  handlePaginate,
  renderFooter,
  loading,
  handleDealNavigate,
  ListItem,
  autoFocus,
}) {
  const { theme } = useTheme();

  return (
    <>
      <SearchBar
        autoFocus={autoFocus}
        placeholder="Find a game"
        onChangeText={(e) => handleInputChange(e)}
        value={inputValue}
        round={2}
        showLoading={loading}
        containerStyle={{
          backgroundColor: theme.colors.grey5,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
      />

      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          initialNumToRender={60}
          maxToRenderPerBatch={60}
          onEndReached={handlePaginate || null}
          onEndReachedThreshold={2}
          renderItem={({ item }) => (
            <ListItem
              key={item.gameID}
              item={item}
              handleOnPress={handleDealNavigate}
            />
          )}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flatListContainer: { paddingBottom: 70 },
});

SearchableFlatList.defaultProps = {
  loading: false,
  data: [],
  handlePaginate: null,
  renderFooter: null,
  autoFocus: false,
};

SearchableFlatList.propTypes = {
  inputValue: string.isRequired,
  handleInputChange: func.isRequired,
  data: arrayOf(oneOfType([gameListType, favouriteType])),
  handlePaginate: func,
  renderFooter: func,
  loading: bool,
  handleDealNavigate: func.isRequired,
  ListItem: elementType.isRequired,
  autoFocus: bool,
};

export default SearchableFlatList;
