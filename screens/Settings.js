/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, Text, Switch, Divider, Button } from "@rneui/themed";
import { BASE } from "../constants/Urls";

function Settings({ stores }) {
  const { theme } = useTheme();
  const [savedStores, setSavedStores] = useState();

  async function setCache(value) {
    const result = await AsyncStorage.setItem(
      "@savedStores",
      JSON.stringify(value)
    ).then((res) => res);
    return result;
  }

  // Log stores for debugging
  async function logStores() {
    const result = await AsyncStorage.getItem("@savedStores").then(
      (res) => res
    );
    console.log(result);
    return result;
  }

  // Clear stores for debugging
  async function clearSavedStores() {
    await AsyncStorage.removeItem("@savedStores").then(() => {
      setSavedStores(stores.filter((item) => item.isActive === 1));
      console.log("saved stores reset");
    });
  }

  useEffect(() => {
    async function getSavedStored() {
      const result = await AsyncStorage.getItem("@savedStores").then(
        (res) => res
      );

      if (result) {
        return setSavedStores(JSON.parse(result));
      }

      const defaultCache = stores.filter((item) => item.isActive === 1);
      await AsyncStorage.setItem("@savedStores", JSON.stringify(defaultCache));
      return setSavedStores(defaultCache);
    }

    if (!savedStores) {
      getSavedStored();
    }
  }, [savedStores, stores]);

  const handleSwitch = (storeID, value) => {
    if (!value) {
      const newSaved = savedStores.filter((item) => item.storeID !== storeID);
      setSavedStores(newSaved);
      return setCache(newSaved);
    }

    const store = stores.find((item) => item.storeID === storeID);
    setSavedStores(savedStores.concat(store));
    return setCache(savedStores.concat(store));
  };

  const getSwitchState = (storeID) => {
    const store =
      savedStores &&
      savedStores.length &&
      savedStores.find((item) => item.storeID === storeID);
    return !!store;
  };

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View>
          <Text h3 style={styles.sectionHeading}>
            Available Stores
          </Text>
          <Divider />
          {stores &&
            stores.map((store) =>
              store.isActive ? (
                <View key={store.storeID}>
                  <View style={styles.storeWrapper} key={store.storeID}>
                    <View style={styles.image}>
                      <Image
                        style={{ width: 24, height: 24 }}
                        source={{
                          uri: `${BASE}${store.images.icon}`,
                        }}
                      />
                    </View>
                    <View style={[styles.title, { color: theme.colors.black }]}>
                      <Text style={{ fontSize: 18 }}>{store.storeName}</Text>
                    </View>

                    <View style={{ flex: 2 }}>
                      <Switch
                        value={getSwitchState(store.storeID)}
                        onValueChange={(value) =>
                          handleSwitch(store.storeID, value)
                        }
                      />
                    </View>
                  </View>
                  <Divider />
                </View>
              ) : null
            )}
        </View>
        <Button title="Check Cache" onPress={() => logStores()} />
        <Button title="Clear Cache" onPress={() => clearSavedStores()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    paddingHorizontal: 20,
  },
  sectionHeading: {
    paddingVertical: 10,
  },
  storeWrapper: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  title: {
    flex: 7,
  },
  image: {
    flex: 1,
  },
});

export default Settings;
