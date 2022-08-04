/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, Text, Switch, Divider } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { setSavedStores } from "../redux/storesSlice";
import { fetchDeal } from "../redux/dealsSlice";
import IconImage from "../components/IconImage";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";

function Settings() {
  const { stores, savedStores } = useSelector((state) => state.stores);
  const { deals } = useSelector((state) => state.deals);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleSwitch = (storeID, value) => {
    if (!value) {
      dispatch(
        setSavedStores(savedStores.filter((item) => item.storeID !== storeID))
      );
    } else {
      const store = stores.find((item) => item.storeID === storeID);
      dispatch(setSavedStores(savedStores.concat(store)));
      if (
        !deals.find(
          (item) => parseInt(item.storeID, 10) === parseInt(storeID, 10)
        )
      ) {
        dispatch(fetchDeal(HOME_FILTER.replace(DELIM_ID, storeID), deals));
      }
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
