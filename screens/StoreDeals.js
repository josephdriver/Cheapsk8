/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SearchBar, useTheme, Text, Icon } from "@rneui/themed";

import useAxiosFetch from "../utilities/useAxiosFetch";
import { DEALS } from "../constants/Urls";

function StoreDeals({ route }) {
  const { storeId, name } = route.params;
  const { theme } = useTheme();

  const [search, setSearch] = useState("");

  const { data, error, loading } = useAxiosFetch(
    `${DEALS}storeID=${storeId}`,
    0,
    false,
    true,
    false,
    []
  );

  const Item = useCallback(
    ({ deal }) => (
      <View>
        <Text>{deal.title}</Text>
      </View>
    ),
    []
  );

  if (error) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "space-around",
          backgroundColor: theme.colors.grey5,
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ alignSelf: "center" }}>
            <Icon name="emoji-sad" type="entypo" size={40} />
          </View>
          <Text style={{ alignSelf: "center" }}>
            Whoops, looks like there is an issue.
          </Text>
          <Text style={{ alignSelf: "center" }}>Please try again later.</Text>
        </View>
      </View>
    );
  }

  if (data.length === 0 && loading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "space-around",
          backgroundColor: theme.colors.grey5,
        }}
      >
        <View style={{ width: "100%" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ alignSelf: "center" }}>
            Searching the {name} mainframe...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
        <SearchBar
          placeholder="Find a game"
          onChangeText={(e) => setSearch(e)}
          value={search}
          round={2}
          containerStyle={{
            backgroundColor: theme.colors.grey5,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
        />
        {data.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.dealID}
            data={data}
            renderItem={({ item }) => <Item deal={item} />}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default StoreDeals;
