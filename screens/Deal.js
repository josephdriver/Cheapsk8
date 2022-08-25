/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar, useTheme, Text, Button } from "@rneui/themed";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";
import DEFAULT_STORES from "../constants/Defaults";

function Deal() {
  const { theme } = useTheme();
  const { deals, fetchTime, loading } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);

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
          <Text style={{ alignSelf: "center" }}>Grabbing the best prices!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Text>Deal Screen</Text>
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

export default Deal;
