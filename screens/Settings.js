import AwesomeAlert from "react-native-awesome-alerts";
import React, { useCallback, useState } from "react";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Switch, Divider, Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clone } from "lodash";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import errorMessage from "../utilities/firebaseErrorParsing";
import { setDeals } from "../redux/dealsSlice";
import { setLoading, setSavedStores } from "../redux/storesSlice";
import { setFavourites } from "../redux/favouritesSlice";
import IconImage from "../components/shared/IconImage";
import {
	BACKGROUND_PRIMARY,
	DANGER,
	PRIMARY,
	PRIMARY_DISABLED,
	WHITE,
} from "../constants/Colours";

function Settings() {
	const [pending, setPending] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const { favourites } = useSelector((state) => state.favourites);
	const { stores, savedStores } = useSelector((state) => state.stores);
	const { user } = useSelector((state) => state.user);
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
		setPending(true);
		auth()
			.signOut()
			.then(() => {
				navigation.reset({
					index: 0,
					routes: [{ name: "home" }],
				});
			});
	}, [navigation]);

	// Handle the switch state change
	const handleSwitch = (storeID, value) => {
		let existingStores = savedStores ? clone(savedStores) : [];
		const toggleStore = stores.find((item) => item.storeID === storeID);

		if (value) {
			dispatch(setSavedStores(existingStores.push(toggleStore)));
		} else {
			existingStores = existingStores.filter(
				(s) => s.storeID !== toggleStore.storeID
			);
		}

		dispatch(setSavedStores(existingStores));
		dispatch(setDeals([]));
		dispatch(setLoading(true));

		firestore().collection("users").doc(user.uid).update({
			savedStores: existingStores,
		});
	};

	// Handle the notification switch
	const handleNotificationSwitch = () => {
		// to be implemented
	};

	const onResetFavouritesPressed = useCallback(() => {
		dispatch(setFavourites([]));
		firestore().collection("users").doc(user.uid).update({
			favourites: [],
		});
		Toast.show({
			type: "success",
			text1: "Favourites have been reset",
		});
	}, [dispatch, user.uid]);

	// Get the switch state
	const getSwitchState = useCallback(
		(storeID) => {
			if (
				savedStores &&
				savedStores.length > 0 &&
				savedStores.find((item) => item.storeID === storeID)
			) {
				return true;
			}
			return false;
		},
		[savedStores]
	);

	const onResetSettingsPressed = useCallback(() => {
		dispatch(setSavedStores([]));
		dispatch(setDeals([]));

		firestore().collection("users").doc(user.uid).update({
			savedStores: [],
		});

		Toast.show({
			type: "success",
			text1: "Favourite Stores have been reset",
		});
	}, [dispatch, user.uid]);

	const removeUserData = useCallback((collection, id) => {
		firestore().collection(collection).doc(id).delete();
	}, []);

	const handleDeleteAccount = useCallback(() => {
		setPending(true);
		const u = auth().currentUser;
		u.delete()
			.then(() => {
				navigation.reset({
					index: 0,
					routes: [{ name: "home" }],
				});
				removeUserData("users", u.uid);
			})
			.catch((err) => {
				Toast.show({
					type: "error",
					text1: errorMessage(err),
				});
			});
		setPending(false);
		setShowAlert(false);
	}, [navigation, removeUserData]);

	return (
		<View style={styles.view}>
			<AwesomeAlert
				show={showAlert}
				showProgress={false}
				title="Delete Account"
				message="Are you sure you want to delete your account? This action cannot be undone."
				closeOnTouchOutside
				closeOnHardwareBackPress={false}
				showCancelButton
				showConfirmButton
				cancelText="Cancel"
				cancelButtonStyle={styles.button}
				confirmText="Confirm"
				confirmButtonColor={DANGER}
				confirmButtonStyle={[styles.button, styles.danger]}
				onCancelPressed={() => {
					setShowAlert(false);
				}}
				onConfirmPressed={() => {
					handleDeleteAccount();
				}}
			/>
			<ScrollView>
				<View>
					<Text style={styles.heading}>Enable Notifications</Text>
					<Text style={styles.paragraph}>
						Enable notifications to receive alerts when a deal
						available for a game in your favourites.
					</Text>
					<View>
						<View style={styles.storeWrapper}>
							<View style={styles.title}>
								<Text style={styles.titleText}>
									Enable push notifications
								</Text>
								<Text style={styles.accentText}>
									(Coming Soon)
								</Text>
							</View>

							<View style={{ flex: 2 }}>
								<Switch
									disabled
									color={PRIMARY}
									value={false}
									onValueChange={(value) =>
										handleNotificationSwitch(value)
									}
								/>
							</View>
						</View>
						<Divider />
					</View>
					<Divider />
					<Text style={styles.heading}>Favourite Stores</Text>
					<Text style={styles.paragraph}>
						Select your favourite stores to customize your the Home
						screen and hide unwanted deals on a Game page. If no
						stores are selected, everything will be displayed.
					</Text>
					{stores.map((store) =>
						store.isActive ? (
							<View key={store.storeID}>
								<View
									style={styles.storeWrapper}
									key={store.storeID}
								>
									<View style={styles.image}>
										<IconImage
											url={store.images.logo}
											width={24}
											height={24}
										/>
									</View>
									<View style={styles.title}>
										<Text style={styles.titleText}>
											{store.storeName}
										</Text>
									</View>

									<View style={{ flex: 2 }}>
										<Switch
											color={PRIMARY}
											value={getSwitchState(
												store.storeID
											)}
											onValueChange={(value) =>
												handleSwitch(
													store.storeID,
													value
												)
											}
										/>
									</View>
								</View>
								<Divider />
							</View>
						) : null
					)}
					<Text style={styles.heading}>Remove Data</Text>
					<Text style={styles.paragraph}>
						Use the buttons below to remove the saved titles in your
						watch list as well the application settings. This will
						remove data from you device as well our servers.
					</Text>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1, marginBottom: 20 }}>
							<Button
								disabled={
									!favourites ||
									favourites.length === 0 ||
									pending
								}
								disabledStyle={{
									backgroundColor: PRIMARY_DISABLED,
									borderColor: PRIMARY_DISABLED,
								}}
								titleStyle={styles.buttonTitle}
								buttonStyle={styles.button}
								title="Reset Favourites"
								onPress={onResetFavouritesPressed}
							/>
						</View>
						<View style={{ flex: 1, marginBottom: 20 }}>
							<Button
								titleStyle={styles.buttonTitle}
								buttonStyle={styles.button}
								disabled={pending}
								title="Reset Stores"
								onPress={onResetSettingsPressed}
							/>
						</View>
					</View>
					<Divider />
					<Text style={styles.heading}>Delete Account</Text>
					<Text style={styles.paragraph}>
						Use the button below to delete your account. This will
						remove all data from your device and our servers.
					</Text>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1, marginBottom: 20 }}>
							<Button
								disabled={pending}
								titleStyle={styles.buttonTitle}
								buttonStyle={[
									styles.button,
									styles.danger,
									styles.span,
								]}
								title="Delete Account"
								onPress={() => setShowAlert(true)}
							/>
						</View>
					</View>
					<Divider />
					<View style={{ marginVertical: 30 }}>
						<Button
							titleStyle={styles.buttonTitle}
							buttonStyle={[styles.button, styles.span]}
							disabled={pending}
							title="Sign Out"
							onPress={onSignOutPressed}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		height: "100%",
		backgroundColor: BACKGROUND_PRIMARY,
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
	accentText: {
		color: PRIMARY,
		fontWeight: "bold",
	},
	image: {
		flex: 1,
	},
	button: {
		alignSelf: "center",
		backgroundColor: PRIMARY,
		borderWidth: 2,
		borderColor: PRIMARY,
		borderRadius: 10,
	},
	danger: {
		backgroundColor: DANGER,
		borderColor: DANGER,
	},
	span: {
		width: "90%",
	},
	buttonTitle: {
		fontWeight: "bold",
	},
});

export default Settings;
