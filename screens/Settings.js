/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import analytics from "@react-native-firebase/analytics";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, Text, Switch, Divider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clone } from "lodash";
import { useFocusEffect } from "@react-navigation/native";

import { setSavedStores } from "../redux/storesSlice";
import IconImage from "../components/shared/IconImage";

function Settings() {
  const { stores, savedStores } = useSelector((state) => state.stores);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      analytics().logScreenView({
        screen_name: "Settings",
        screen_class: "Settings",
      });
    }, [])
  );

  const handleSwitch = (storeID, value) => {
    if (!value) {
      const clonedStores = clone(savedStores);
      const newStores = clonedStores.filter((item) => item.storeID !== storeID);
      dispatch(setSavedStores(newStores));
    } else {
      const newStore = stores.find((item) => item.storeID === storeID);
      const newStores = clone(savedStores);
      if (newStores) {
        newStores.push(newStore);
      }
      dispatch(setSavedStores(newStores));
    }
  };

  const getSwitchState = (storeID) => {
    const store = savedStores.find((item) => item.storeID === storeID);
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
          {stores.map((store) =>
            store.isActive ? (
              <View key={store.storeID}>
                <View style={styles.storeWrapper} key={store.storeID}>
                  <View style={styles.image}>
                    <IconImage url={store.images.logo} width={24} height={24} />
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
