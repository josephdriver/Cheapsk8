/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { useTheme, Text, Switch, Divider, Button } from "@rneui/themed";
import { BASE } from "../constants/Urls";
import {
  logCache,
  clearCache,
  getCache,
  setCache,
} from "../utilities/cacheHelpers";

function Settings({ stores }) {
  const { theme } = useTheme();
  const [savedStores, setSavedStores] = useState();

  useEffect(() => {
    if (!savedStores) {
      getCache(
        "@savedStores",
        setSavedStores,
        null,
        null,
        stores.filter((item) => item.isActive === 1)
      );
    }
  }, [savedStores, stores]);

  const handleSwitch = (storeID, value) => {
    if (!value) {
      const newSaved = savedStores.filter((item) => item.storeID !== storeID);
      setSavedStores(newSaved);
      return setCache("@savedStores", newSaved, setSavedStores);
    }
    // setCache(key, value, callback = null, type = "object")
    const store = stores.find((item) => item.storeID === storeID);
    setSavedStores(savedStores.concat(store));
    return setCache("@savedStores", savedStores.concat(store), setSavedStores);
  };

  const getSwitchState = (storeID) => {
    const store =
      savedStores &&
      savedStores.length &&
      savedStores.find((item) => item.storeID === storeID);
    return !!store;
  };

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <ScrollView>
        <View>
          <Text
            h3
            style={[styles.sectionHeading, { color: theme.colors.primary }]}
          >
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
                          uri: `${BASE}${store.images.logo}`,
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
        <Button title="Check Cache" onPress={() => logCache("@savedStores")} />
        <Button
          title="Clear Cache"
          onPress={() =>
            clearCache(
              "@savedStores",
              setSavedStores,
              stores.filter((item) => item.isActive === 1)
            )
          }
        />
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
