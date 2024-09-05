import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import axios from "axios";

import { GAMES } from "../constants/Urls";
import ListItem from "../components/search/ListItem";
import { LARGE_SPINNER } from "../constants/Defaults";
import SearchableFlatList from "../components/shared/SearchableFlatList";
import EmptyList from "../components/shared/EmptyList";

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

  const handlePaginate = useCallback(() => {
    if (!loading && result && result.length >= 60) {
      setParams((prevState) => ({
        ...prevState,
        pageNumber: prevState.pageNumber + 1,
      }));
    }
  }, [loading, result]);

  const renderFooter = useCallback(
    () => (
      <View>
        {loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={LARGE_SPINNER}
            color={theme.colors.primary}
          />
        )}
      </View>
    ),
    [loading, theme.colors.primary]
  );

  const emptyMessage = useMemo(() => {
    if (loading) return "";
    return query
      ? "No results... Search for another Title?"
      : "Search for a Title";
  }, [query, loading]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <SearchableFlatList
        inputValue={query}
        handleInputChange={handleInputChange}
        data={result}
        handlePaginate={handlePaginate}
        renderFooter={renderFooter}
        loading={loading}
        handleDealNavigate={handleDealNavigate}
        ListItem={ListItem}
        ListEmptyComponent={<EmptyList message={emptyMessage} />}
        autoFocus
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
});
export default Search;
