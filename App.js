import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { BACKGROUND_COLOUR, TEXT_COLOUR } from "./constants/Colours";
import useAxiosFetch from "./utilities/useAxiosFetch";
import { DEALS, HOME_FILTER } from "./constants/Urls";
import DEFAULT_STORES from "./constants/Defaults";
import Main from "./screens/Main";

// SET CONSTANT FILTER PARAMS FOR HOTTEST DEALS - LIMIT 10

function App() {
  const [appIsReady, setAppIsReady] = useState(true);
  const [fetchOne, setFetchOne] = useState(false);
  const [fetchTwo, setFetchTwo] = useState(false);
  const [fetchThree, setFetchThree] = useState(false);
  const [fetchFour, setFetchFour] = useState(false);

  const [favoriteStores] = useState([]);
  const [featuredStores, setFeaturedStores] = useState(favoriteStores);

  useEffect(() => {
    if (featuredStores && featuredStores.length < 4) {
      const stores = featuredStores;
      DEFAULT_STORES.forEach((element) => {
        if (stores.length < 4 && !stores.includes(element)) {
          stores.push(element);
        }
      });
      setFeaturedStores(stores);
    }
  }, [featuredStores]);

  useEffect(() => {
    if (featuredStores && featuredStores.length === 4) {
      setFetchOne(true);
      setFetchTwo(true);
      setFetchThree(true);
      setFetchFour(true);
    }
  }, [featuredStores]);

  const { data: dataOne, loading: loadingOne } = useAxiosFetch(
    `${DEALS}storeID=${featuredStores[0]}${HOME_FILTER}`,
    [],
    0,
    fetchOne,
    false
  );

  const { data: dataTwo, loading: loadingTwo } = useAxiosFetch(
    `${DEALS}storeID=${featuredStores[1]}${HOME_FILTER}`,
    [],
    0,
    fetchTwo,
    false
  );

  const { data: dataThree, loading: loadingThree } = useAxiosFetch(
    `${DEALS}storeID=${featuredStores[2]}${HOME_FILTER}`,
    [],
    0,
    fetchThree,
    false
  );

  const { data: dataFour, loading: loadingFour } = useAxiosFetch(
    `${DEALS}storeID=${featuredStores[3]}${HOME_FILTER}`,
    [],
    0,
    fetchFour,
    false
  );

  useEffect(() => {
    if (dataOne && dataOne.length > 0) {
      setFetchOne(false);
    }
    if (dataTwo && dataTwo.length > 0) {
      setFetchTwo(false);
    }
    if (dataThree && dataThree.length > 0) {
      setFetchThree(false);
    }
    if (dataFour && dataFour.length > 0) {
      setFetchThree(false);
    }

    if (
      dataOne &&
      dataOne.length &&
      dataTwo &&
      dataTwo.length &&
      dataThree &&
      dataThree.length &&
      dataFour &&
      dataFour.length
    ) {
      setAppIsReady(true);
    }
  }, [dataOne, dataTwo, dataThree, dataFour, appIsReady]);

  console.log(loadingOne);
  console.log(loadingTwo);
  console.log(loadingThree);
  console.log(loadingFour);

  if (!appIsReady || loadingOne || loadingTwo || loadingThree || loadingFour) {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashContainer}>
          <Text style={styles.title}>Stinjy.</Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Main
      storeOne={{ storeId: featuredStores[0], data: dataOne }}
      storeTwo={{ storeId: featuredStores[1], data: dataTwo }}
      storeThree={{ storeId: featuredStores[2], data: dataThree }}
      storeFour={{ storeId: featuredStores[3], data: dataFour }}
    />
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    paddingVertical: 10,
    color: "white",
  },
});

export default App;
