// eslint-disable-next-line import/no-extraneous-dependencies
import { useNetInfo } from "@react-native-community/netinfo";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";

import { fetchStores } from "../redux/storesSlice";
import { setUser } from "../redux/userSlice";
import HomeWrapper from "./HomeWrapper";
import Settings from "./Settings";
import TabBar from "../components/TabBar";
import FavouritesWrapper from "./FavouritesWrapper";
import Offline from "./Offline";
import { OPTIONS, NAVIGATOR_OPTIONS } from "../constants/NavigatorConfig";
import Login from "./Login";
import ResetPassword from "./PasswordReset";
import RegisterAccount from "./RegisterAccount";

function Main() {
  const Stack = createStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const { isConnected } = useNetInfo();
  const { favourites, alertState } = useSelector((state) => state.favourites);
  const { stores } = useSelector((state) => state.stores);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchStores());
    }
  }, [dispatch, stores]);

  const HomeComponent = useCallback(() => <HomeWrapper />, []);
  const SettingsComponent = useCallback(
    () => <Settings stores={stores} />,
    [stores]
  );

  const WatchListComponent = useCallback(() => <FavouritesWrapper />, []);
  const LoginScreenComponent = useCallback(() => <Login />, []);
  const RegisterScreenComponent = useCallback(() => <RegisterAccount />, []);
  const PasswordResetScreenComponent = useCallback(() => <ResetPassword />, []);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (u) => {
      dispatch(setUser(u));
      if (initializing) setInitializing(false);

      if (u) {
        console.log("User Logged In", u);
        firestore().collection("users").doc(u.uid).set({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          emailVerified: u.emailVerified,
        });
        firestore().collection("watchLists").doc(u.uid).set({
          favourites,
          alertState,
        });
      }
    },
    [initializing, dispatch, favourites, alertState]
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (!user) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
            <Stack.Screen
              name="Login"
              component={LoginScreenComponent}
              options={OPTIONS}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreenComponent}
              options={OPTIONS}
            />
            <Stack.Screen
              name="PasswordReset"
              component={PasswordResetScreenComponent}
              options={OPTIONS}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  if (isConnected === false) {
    return <Offline />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="home" options={OPTIONS} component={HomeComponent} />
          <Tab.Screen
            name="heart"
            component={WatchListComponent}
            options={OPTIONS}
          />
          <Tab.Screen
            name="cog"
            options={OPTIONS}
            component={SettingsComponent}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Main;
