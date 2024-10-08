import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

import { BACKGROUND_PRIMARY } from "../constants/Colours";

function Offline() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>No Internet</Text>
        <Text style={styles.subtitle}>
          Come back later once you have reconnected to the network.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_PRIMARY,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: "center",
  },
});

export default Offline;
