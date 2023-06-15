/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, Text, SearchBar } from "@rneui/themed";
import { debounce } from "lodash";

import { fetchDeals } from "../redux/dealsSlice";
import { HOME_FILTER, DELIM_ID, DEALS } from "../constants/Urls";
import DEFAULT_STORES from "../constants/Defaults";
import dealsCache from "../constants/CacheTimers";
import ContentBlock from "../components/ContentBlock";
import useAxiosFetch from "../utilities/useAxiosFetch";
import ListItem from "../components/ListItem";

function Home({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { deals, fetchTime, loading } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);
  const [query, setQuery] = useState("");
  const [fetch, setFetch] = useState(false);
  const [result, setResult] = useState(null);
  const [storeIds, setStoreIds] = useState(null);

  useEffect(() => {
    setStoreIds(savedStores.map((item) => item.storeID).join(","));
  }, [savedStores]);

  const { data, loading: queryLoading } = useAxiosFetch(
    `${DEALS}storeID=${storeIds}&title=${query}&pageSize=30`,
    0,
    !!(query && fetch),
    false,
    false,
    null
  );

  useEffect(() => {
    if (data) {
      setResult(data);
    }
    Keyboard.dismiss();
    setFetch(false);
  }, [data]);

  const getUrlArray = useCallback(() => {
    let storesArray = savedStores;

    if (savedStores.length === 0) {
      storesArray = DEFAULT_STORES;
    }

    const urlArray = [];
    let count = 0;
    storesArray.map((item) => {
      if (count < 10 && item.isActive === 1) {
        urlArray.push(HOME_FILTER.replace(DELIM_ID, item.storeID));
        count += 1;
      }
      return item;
    });

    return urlArray;
  }, [savedStores]);

  const getStoreTitle = useCallback(
    (id) => {
      if (stores.length > 0) {
        const storeName = stores.find((item) => item.storeID === id);
        return storeName.storeName;
      }
      return null;
    },
    [stores]
  );

  useEffect(() => {
    const time = new Date();
    if (deals.length === 0 || fetchTime + dealsCache < time.getTime()) {
      dispatch(fetchDeals(getUrlArray()));
    }
  }, [deals, fetchTime, getUrlArray, dispatch]);

  const handleNavigate = useCallback(
    (storeId) => {
      navigation.navigate("StoreDeals", {
        storeId,
        name: getStoreTitle(storeId),
      });
    },
    [navigation, getStoreTitle]
  );

  const changeHandler = useCallback(() => {
    setFetch(true);
  }, []);

  useEffect(() => {
    if (!query && fetch) {
      setFetch(false);
      setResult(null);
    } else if (!query && !fetch) {
      setResult(null);
    }
  }, [query, fetch]);

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [changeHandler]
  );

  const onChange = useCallback(
    (event) => {
      setQuery(event);
      debouncedChangeHandler();
    },
    [debouncedChangeHandler]
  );

  if (loading) {
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
            Getting the latest deals... Hold tight!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <SearchBar
        autofocus={false}
        placeholder="Find a game"
        onChangeText={(e) => onChange(e)}
        value={query}
        round={2}
        showLoading={queryLoading}
        containerStyle={{
          backgroundColor: theme.colors.grey5,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
      />
      {result ? (
        <View>
          {result.length === 0 ? (
            <View>
              <Text>No results</Text>
            </View>
          ) : (
            <View style={{ paddingBottom: 70 }}>
              <FlatList
                keyExtractor={(item) => item.dealID}
                data={data}
                renderItem={({ item }) => <ListItem deal={item} />}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={{ paddingBottom: 100 }}>
          <ContentBlock
            deals={deals}
            savedStores={savedStores}
            stores={stores}
            loading={loading}
            handleNavigate={handleNavigate}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "center",
  },
});

export default Home;
