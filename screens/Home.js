/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SearchBar, Button, useThemeMode, useTheme } from "@rneui/themed";
import { BACKGROUND_COLOUR } from "../constants/Colours";
import { logCache, clearCache } from "../utilities/cacheHelpers";

function Home({ setStores }) {
  const [search, setSearch] = useState("");
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const updateSearch = (e) => {
    setSearch(e);
  };

  // useEffect(() => {
  //   console.log(favoriteStores);
  //   if (!favoriteStores || (favoriteStores && favoriteStores.length < 4)) {
  //     const stores = favoriteStores;
  //     DEFAULT_STORES.forEach((element) => {
  //       if (stores.length < 4 && !stores.includes(element)) {
  //         stores.push(element);
  //       }
  //     });
  //     setFeaturedStores(stores);
  //   }
  // }, [favoriteStores]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.background }]}>
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
        {/* <>
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
        </> */}
        <Button title="Check Cache" onPress={() => logCache("@stores")} />
        <Button
          title="Clear Cache"
          onPress={() => {
            clearCache("@stores", setStores, null);
          }}
        />
        <Button
          title={`Toggle Theme ${mode}`}
          onPress={() => setMode(mode === "dark" ? "light" : "dark")}
        />
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
