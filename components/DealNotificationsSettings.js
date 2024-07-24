import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, Divider, Switch } from "@rneui/themed";

function DealNotificationsSettings() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>App Notifiations</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.optionsText}>
            <Text style={styles.rowPadding}> If game has any sale</Text>
            <Text style={styles.rowPadding}> If game is 25% off</Text>
            <Text style={styles.rowPadding}> If game is 50% off</Text>
            <Text style={styles.rowPadding}> If game is lowest ever</Text>
          </View>
          <View style={styles.optionsToggles}>
            <Switch value onValueChange={(value) => console.log(value)} />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  settingsContainer: {
    flexDirection: "row",
  },
  optionsText: {
    flex: 2,
  },
  optionsToggles: {
    flex: 1,
  },
  rowPadding: {
    paddingVertical: 10,
  },
});

export default DealNotificationsSettings;
