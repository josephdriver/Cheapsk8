/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  SearchBar,
  Button,
  useThemeMode,
  useTheme,
  Divider,
  Text,
} from "@rneui/themed";
import {
  logCache,
  clearCache,
  getCache,
  setCache,
} from "../utilities/cacheHelpers";
import { HOME_FILTER, DELIM_ID, BASE } from "../constants/Urls";
import { multiGetRequest } from "../utilities/axiosHelpers";
import HorizontalCollection from "../components/HorizontalCollection";

function Home({ stores, setStores }) {
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

  function getStoreTitle(id) {
    if (stores && stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.storeName;
    }
    return null;
  }

  function getStoreLogo(id) {
    if (stores && stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.images.logo;
    }
    return null;
  }

  // useEffect(() => {
  //   if (!deals) {
  //     // getCache("@deals", setDeals, setGetDeals, true);
  //     setGetDeals(true);
  //   }

  //   if (deals && deals.length > 0) {
  //     const date = new Date();
  //     const dealObj = { data: [], expireTime: date.getTime() + 3600000 };

  //     deals.map((item) => {
  //       if (item.status === "fulfilled") {
  //         dealObj.data.push(item.value.data);
  //       }
  //       return item;
  //     });
  //     setGetDeals(false);
  //     setCache("@deals");
  //     setDeals(dealObj);
  //   }
  // }, [deals]);

  // useEffect(() => {
  //   const urlArray = [];
  //   if (savedStores) {
  //     savedStores.map((store) =>
  //       urlArray.push(HOME_FILTER.replace(DELIM_ID, store.storeID))
  //     );
  //     if (urlArray.length > 0) {
  //       multiGetRequest(urlArray, setDeals);
  //     }
  //   }
  // }, [getDeals, savedStores, deals]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <ScrollView>
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
        {deals &&
          deals.data &&
          deals.data.length > 0 &&
          deals.data.map((store) => (
            <>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.image}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: `${BASE}${getStoreLogo(
                        store[0].storeID ? store[0].storeID : null
                      )}`,
                    }}
                  />
                </View>
                <View style={{ flex: 9, padding: 10 }}>
                  <Text h3 style={{ color: theme.colors.primary }}>
                    {getStoreTitle(store[0].storeID ? store[0].storeID : null)}{" "}
                    Deals
                  </Text>
                </View>
              </View>
              <Divider />
              <ScrollView horizontal>
                <HorizontalCollection data={store} />
                {/* <View style={{ flexDirection: "row" }}>
                  {store.map((item, index) => {
                    if (index === 0 || index === 5) {
                      return (
                        <View key={item.dealID}>
                          <View>
                            <Image
                              style={{ width: 300, height: 200 }}
                              source={{
                                uri: `${STEAM_HEADER.replace(
                                  DELIM_ID,
                                  item.steamAppID
                                )}`,
                              }}
                            />
                          </View>
                          <Text>{item.title}</Text>
                        </View>
                      );
                    }
                    return (
                      <View key={item.dealID}>
                        <View>
                          <Image
                            style={{ width: 184, height: 69 }}
                            source={{
                              uri: `${STEAM_MEDIUM_CAP.replace(
                                DELIM_ID,
                                item.steamAppID
                              )}`,
                            }}
                          />
                        </View>
                        <Text>{item.title}</Text>
                      </View>
                    );
                  })}
                </View> */}
              </ScrollView>
            </>
          ))}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    alignSelf: "center",
  },
});

export default Home;
