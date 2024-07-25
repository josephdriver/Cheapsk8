import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme, SearchBar } from "@rneui/themed";
import { useSelector } from "react-redux";
import axios from "axios";

import { GAMES } from "../constants/Urls";
import ListItem from "../components/ListItem";

function Search({ navigation }) {
  const { theme } = useTheme();
  const { stores, savedStores } = useSelector((state) => state.stores);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [result, setResult] = useState(null);
  const [params, setParams] = useState({
    title: query,
    storeID:
      savedStores.length > 0
        ? savedStores.map((s) => s.storeID)
        : stores.map((s) => s.storeID),
    pageSize: 60,
    pageNumber: 0,
  });

  useEffect(() => {
    if (!debouncedQuery) {
      setResult(null);
      setParams((prevState) => ({ ...prevState, pageNumber: 0 }));
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const delayedInputTimeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);
    return () => clearTimeout(delayedInputTimeoutId);
  }, [query]);

  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      title: debouncedQuery,
      pageNumber: 0,
    }));
  }, [debouncedQuery]);

  const handleInputChange = useCallback((event) => {
    setQuery(event);
  }, []);

  const handleDealNavigate = useCallback(
    (deal) => {
      navigation.navigate("Deal", {
        deal,
      });
    },
    [navigation]
  );

  useEffect(() => {
    if (params.title) {
      setLoading(true);
      const api = axios.create({
        baseURL: GAMES,
        withCredentials: false,
        params,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      api
        .get()
        .then((response) => {
          if (!params.pageNumber) {
            setResult(response.data);
          } else {
            setResult((prevState) => [...prevState, ...response.data]);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params]);

  const handlePaingate = useCallback(() => {
    if (!loading && result && result.length >= 60) {
      setParams((prevState) => ({
        ...prevState,
        pageNumber: prevState.pageNumber + 1,
      }));
    }
  }, [loading, result]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <SearchBar
        autoFocus
        placeholder="Find a game"
        onChangeText={(e) => handleInputChange(e)}
        value={query}
        round={2}
        showLoading={loading}
        containerStyle={{
          backgroundColor: theme.colors.grey5,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
      />
      {result && (
        <View style={{ paddingBottom: 70 }}>
          <FlatList
            data={result}
            initialNumToRender={60}
            maxToRenderPerBatch={60}
            onEndReached={() => handlePaingate()}
            onEndReachedThreshold={2}
            renderItem={({ item }) => (
              <ListItem
                key={item.gameID}
                deal={item}
                handleDealNavigate={handleDealNavigate}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
  },
});
export default Search;
