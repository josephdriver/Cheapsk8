import React, { useCallback, useState } from "react";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Switch, Divider, Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clone } from "lodash";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { setSavedStores } from "../redux/storesSlice";
import IconImage from "../components/shared/IconImage";
import { BACKGROUND_PRIMARY, PRIMARY, WHITE } from "../constants/Colours";

function Settings() {
  const [pending, setPending] = useState(false);
  const { stores, savedStores } = useSelector((state) => state.stores);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Log the screen view
  useFocusEffect(
    React.useCallback(() => {
      analytics().logScreenView({
        screen_name: "Settings",
        screen_class: "Settings",
      });
    }, [])
  );

  // Sign out the user and reset the navigation stack
  const onSignOutPressed = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });

    setPending(true);
    auth()
      .signOut()
      .then(() => {
        setPending(false);
      });
  }, [navigation]);

  // Handle the switch state change
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

  // Handle the notification switch
  const handleNotificationSwitch = (value) => {
    console.log(value);
  };

  // Get the switch state
  const getSwitchState = useCallback(
    (storeID) => {
      const store = savedStores.find((item) => item.storeID === storeID);
      return !!store;
    },
    [savedStores]
  );

  return (
    <View style={styles.view}>
      <ScrollView>
        <View>
          <Text style={styles.heading}>Enable Notifications</Text>
          <Text style={styles.paragraph}>
            Enable notifications to receive alerts when a deal available for a
            game in your favourites.
          </Text>
          <View>
            <View style={styles.storeWrapper}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Enable push notifications</Text>
              </View>

              <View style={{ flex: 2 }}>
                <Switch
                  color={PRIMARY}
                  value
                  onValueChange={(value) => handleNotificationSwitch(value)}
                />
              </View>
            </View>
            <Divider />
          </View>
          <Divider />
          <Text style={styles.heading}>Favourite Stores</Text>
          <Text style={styles.paragraph}>
            Select your favourite stores to customize your the Home screen and
            hide unwanted deals on a Game page. If no stores are selected,
            everything will be displayed.
          </Text>
          {stores.map((store) =>
            store.isActive ? (
              <View key={store.storeID}>
                <View style={styles.storeWrapper} key={store.storeID}>
                  <View style={styles.image}>
                    <IconImage url={store.images.logo} width={24} height={24} />
                  </View>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>{store.storeName}</Text>
                  </View>

                  <View style={{ flex: 2 }}>
                    <Switch
                      color={PRIMARY}
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
          <Button
            titleStyle={styles.buttonTitle}
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            disabled={pending}
            title="Sign Out"
            onPress={onSignOutPressed}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    backgroundColor: BACKGROUND_PRIMARY,
    // paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 15,
    color: WHITE,
  },
  paragraph: {
    color: WHITE,
    fontSize: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  storeWrapper: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    flex: 7,
  },
  titleText: {
    fontSize: 15,
    color: WHITE,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 50,
    paddingVertical: 50,
  },
  button: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: PRIMARY,
    borderWidth: 2,
    borderColor: PRIMARY,
    borderRadius: 30,
    margin: 30,
  },
  buttonTitle: {
    fontWeight: "bold",
  },
});

export default Settings;
