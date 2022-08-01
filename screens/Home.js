/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchBar,
  Button,
  useThemeMode,
  useTheme,
  Divider,
  Text,
} from "@rneui/themed";
import { fetchDeals } from "../redux/dealsSlice";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";

// import HorizontalCollection from "../components/HorizontalCollection";
import MediumCard from "../components/MediumCard";
import IconImage from "../components/IconImage";
import LargeCard from "../components/LargeCard";

function Home() {
  const [search, setSearch] = useState("");
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();
  const { deals, fetchTime } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);
  const dispatch = useDispatch();

  const updateSearch = (e) => {
    setSearch(e);
  };

  function getUrlArray(collection) {
    const array = [];
    let count = 0;
    collection.map((item) => {
      if (count < 10 && item.isActive === 1) {
        array.push(HOME_FILTER.replace(DELIM_ID, item.storeID));
        count += 1;
      }
      return item;
    });
    return array;
  }

  useEffect(() => {
    if (deals.length === 0) {
      dispatch(fetchDeals(getUrlArray(savedStores)));
    }
  }, [deals, fetchTime, savedStores, dispatch]);

  function getStoreTitle(id) {
    if (stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.storeName;
    }
    return null;
  }

  function getStoreLogo(id) {
    if (stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.images.logo;
    }
    return null;
  }

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
        {deals.length > 0 &&
          deals.map((store) => (
            <View key={store.storeID}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.image}>
                  <IconImage
                    url={getStoreLogo(store.storeID)}
                    width={30}
                    height={30}
                  />
                </View>
                <View style={{ flex: 9, padding: 10 }}>
                  <Text h4 style={{ color: theme.colors.primary }}>
                    {getStoreTitle(store.storeID)} Deals
                  </Text>
                </View>
              </View>
              <Divider />
              <ScrollView>
                {/* <HorizontalCollection data={store} /> */}
                <View>
                  {store.data.map((item, index) =>
                    index === 0 || index === 5 ? (
                      <LargeCard key={item.dealID} deal={item} />
                    ) : (
                      <MediumCard key={item.dealID} deal={item} />
                    )
                  )}
                </View>
              </ScrollView>
            </View>
          ))}

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
