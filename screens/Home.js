/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SearchBar, Button, useThemeMode, useTheme } from "@rneui/themed";
import {
  logCache,
  clearCache,
  getCache,
  setCache,
} from "../utilities/cacheHelpers";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";
import { multiGetRequest } from "../utilities/axiosHelpers";

function Home({ setStores }) {
  const [search, setSearch] = useState("");
  const [savedStores, setSavedStores] = useState(null);
  const [deals, setDeals] = useState(null);
  const [getDeals, setGetDeals] = useState(null);
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const updateSearch = (e) => {
    setSearch(e);
  };

  useEffect(() => {
    if (!savedStores) {
      getCache("@savedStores", setSavedStores);
    }
  }, [savedStores]);

  useEffect(() => {
    if (!deals) {
      getCache("@deals", setDeals, setGetDeals, true);
    }

    if (deals && deals.length > 0) {
      const date = new Date();
      const dealObj = { data: [], expireTime: date.getTime() + 3600000 };

      deals.map((item) => {
        if (item.status === "fulfilled") {
          dealObj.data.push(item.value.data);
        }
        return item;
      });
      setGetDeals(false);
      setCache("@deals", dealObj);
    }
  }, [deals]);

  useEffect(() => {
    const date = new Date();
    if (
      (getDeals && savedStores && !deals) ||
      (deals && deals.expireTime && deals.expireTime < date.getTime())
    ) {
      const urlArray = [];
      savedStores.map((store) =>
        urlArray.push(HOME_FILTER.replace(DELIM_ID, store.storeID))
      );
      if (urlArray.length > 0) {
        multiGetRequest(urlArray, setDeals);
      }
    }
  }, [getDeals, savedStores, deals]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(e) => updateSearch(e)}
        value={search}
        round={2}
        containerStyle={{
          backgroundColor: theme.colors.grey5,
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
        <Button title="Check saved" onPress={() => logCache("@savedStores")} />
        <Button title="Check deals" onPress={() => logCache("@deals")} />
        <Button
          title="Clear deals"
          onPress={() => {
            clearCache("@deals", setDeals, null);
          }}
        />
        <Button
          title="Clear saved"
          onPress={() => {
            clearCache("@savedStores", setSavedStores, null);
          }}
        />
        <Button title="Check store" onPress={() => logCache("@stores")} />
        <Button
          title="Clear stores"
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
