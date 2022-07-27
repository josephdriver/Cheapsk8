/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SearchBar } from "@rneui/themed";
import { BACKGROUND_COLOUR } from "../constants/Colours";

function Home({ favoritesData }) {
  const [search, setSearch] = useState("");
  console.log(favoritesData);
  const updateSearch = (e) => {
    console.log(e);
    setSearch(e);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(e) => updateSearch(e)}
        value={search}
        round={2}
        containerStyle={{
          backgroundColor: BACKGROUND_COLOUR,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
      />
      <ScrollView>
        <>
          {favoritesData.map((item) =>
            item.data && item.data.length > 0 ? (
              <View key={item.storeId}>
                <Text style={{ color: "black" }}>Store {item.storeId}</Text>
                {item.data.map((row) => (
                  <View key={row.dealID}>
                    <Text style={{ color: "black" }}>{row.title}</Text>
                  </View>
                ))}
              </View>
            ) : (
              ""
            )
          )}
        </>
        <Text>Test</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
  },
});

export default Home;
