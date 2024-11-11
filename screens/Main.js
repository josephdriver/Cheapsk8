import { useNetInfo } from "@react-native-community/netinfo";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";

import { fetchStores, setSavedStores } from "../redux/storesSlice";
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
import VerifyEmail from "./VerifyEmail";
import { setFavourites } from "../redux/favouritesSlice";

function Main() {
	const Stack = createStackNavigator();
	const [initializing, setInitializing] = useState(true);
	const { isConnected } = useNetInfo();
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
	const PasswordResetScreenComponent = useCallback(
		() => <ResetPassword />,
		[]
	);

	// Handle user state changes
	const onAuthStateChanged = useCallback(
		(u) => {
			dispatch(setUser(u));

			if (initializing) setInitializing(false);

			// If the user is logged in, check if they have a document in the users collection
			if (u) {
				if (!u.emailVerified) {
					u.sendEmailVerification();
				}
				firestore()
					.collection("users")
					.doc(u.uid)
					.get()
					.then((documentSnapshot) => {
						// If the user does not have a document, create one
						if (!documentSnapshot.data()) {
							firestore().collection("users").doc(u.uid).set({
								uid: u.uid,
								email: u.email,
								displayName: u.displayName,
								emailVerified: u.emailVerified,
								favourites: [],
								savedStores: [],
							});
							dispatch(setFavourites([]));
							dispatch(setSavedStores([]));
						} else {
							// If the user has a document, set the favourites and saved stores
							dispatch(
								setSavedStores(
									documentSnapshot.data().savedStores
								)
							);
							dispatch(
								setFavourites(
									documentSnapshot.data().favourites
								)
							);
						}
					});
			}
		},
		[initializing, dispatch]
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

	if (user && !user.emailVerified) {
		return (
			<SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
						<Stack.Screen
							name="VerifyEmail"
							component={VerifyEmail}
							options={OPTIONS}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		);
	}

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
					<Tab.Screen
						name="home"
						options={OPTIONS}
						component={HomeComponent}
					/>
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
