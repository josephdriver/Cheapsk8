import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme, SearchBar } from "@rneui/themed";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

import useAxiosFetch from "../utilities/useAxiosFetch";
import { DEALS } from "../constants/Urls";
import ListItem from "../components/ListItem";

function Search({ navigation }) {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [fetch, setFetch] = useState(false);
  const { savedStores } = useSelector((state) => state.stores);

  useEffect(() => {
    if (!query && fetch) {
      setFetch(false);
      setResult(null);
    } else if (!query && !fetch) {
      setResult(null);
    }
  }, [query, fetch]);

  const changeHandler = useCallback(() => {
    setFetch(true);
  }, []);

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
  const handleDealNavigate = useCallback(
    (deal) => {
      navigation.navigate("Deal", {
        deal,
      });
    },
    [navigation]
  );

  const { data, loading: queryLoading } = useAxiosFetch(
    `${DEALS}storeID=${savedStores.map(
      (s) => s.storeID
    )}&title=${query}&pageSize=30`,
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
    setFetch(false);
  }, [data]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <SearchBar
        autoFocus
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
      {result && (
        <View style={{ paddingBottom: 70 }}>
          <FlatList
            keyExtractor={(item) => item.dealID}
            data={data}
            renderItem={({ item }) => (
              <ListItem deal={item} handleDealNavigate={handleDealNavigate} />
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
