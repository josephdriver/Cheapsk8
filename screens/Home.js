/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SearchBar, Button, useThemeMode, useTheme } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKGROUND_COLOUR } from "../constants/Colours";

function Home({ setStores, setFavoriteStores }) {
  const [search, setSearch] = useState("");
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const updateSearch = (e) => {
    setSearch(e);
  };

  // Clear stores for debugging
  async function clearStores() {
    await AsyncStorage.removeItem("@stores").then(() => {
      setStores(null);
      console.log("stores reset");
    });
  }

  // Log stores for debugging
  async function logStores() {
    const result = await AsyncStorage.getItem("@stores").then((res) => res);
    console.log(result);
    return result;
  }

  // Clear stores for debugging
  async function clearFavoriteStores() {
    await AsyncStorage.removeItem("@favoriteStores").then(() => {
      setFavoriteStores(null);
      console.log("favorite stores reset");
    });
  }

  // Log stores for debugging
  async function logFavoriteStores() {
    const result = await AsyncStorage.getItem("@favoriteStores").then(
      (res) => res
    );
    console.log(result);
    return result;
  }

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
        <Button
          title="Check Favorite Stores"
          onPress={() => logFavoriteStores()}
        />
        <Button
          title="Clear Favorite Stores"
          onPress={() => {
            clearFavoriteStores();
          }}
        />
        <Button title="Check Cache" onPress={() => logStores()} />
        <Button
          title="Clear Cache"
          onPress={() => {
            clearStores();
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
