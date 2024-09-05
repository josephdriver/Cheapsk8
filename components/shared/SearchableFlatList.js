import React from "react";
import { View, FlatList } from "react-native";
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
  data = [],
  handlePaginate = null,
  renderFooter = null,
  loading = false,
  handleDealNavigate,
  ListItem,
  ListEmptyComponent,
  autoFocus = false,
  isSearchable = true,
}) {
  const { theme } = useTheme();

  return (
    <>
      {isSearchable && (
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
      )}

      <View
        style={{
          paddingTop: isSearchable ? 0 : 10,
          paddingBottom: isSearchable ? 70 : 0,
        }}
      >
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
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </>
  );
}

SearchableFlatList.propTypes = {
  inputValue: string.isRequired,
  handleInputChange: func.isRequired,
  data: arrayOf(oneOfType([gameListType, favouriteType])),
  handlePaginate: func,
  renderFooter: func,
  loading: bool,
  handleDealNavigate: func.isRequired,
  ListItem: elementType.isRequired,
  ListEmptyComponent: elementType.isRequired,
  autoFocus: bool,
  isSearchable: bool,
};

export default SearchableFlatList;
