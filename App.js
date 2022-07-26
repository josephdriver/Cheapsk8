import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { BACKGROUND_COLOUR, TEXT_COLOUR } from "./constants/Colours";
import useAxiosFetch from "./utilities/useAxiosFetch";
import { DEALS } from "./constants/Urls";

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
  pageContainer: {
    backgroundColor: BACKGROUND_COLOUR,
  },
  text: {
    color: TEXT_COLOUR,
  },
});

function App() {
  const [appIsReady, setAppIsReady] = useState(true);
  const [fetchBool, setFetchBool] = useState(false);

  const { data, error, loading } = useAxiosFetch(DEALS, [], 0, fetchBool, true);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
    }
  }, [data]);

  if (!appIsReady) {
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
    <SafeAreaView
      style={{ height: "100%", backgroundColor: BACKGROUND_COLOUR }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
          <Text style={styles.text}>Test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
