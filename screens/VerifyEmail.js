import React from "react";
import auth from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { setLoading, setError } from "../redux/userSlice";
import styles from "../styles/loginStyles";

export default function Login() {
	const dispatch = useDispatch();

	const { loading } = useSelector((state) => state.user);

	useFocusEffect(
		React.useCallback(() => {
			dispatch(setError(null));
		}, [dispatch])
	);

	const onLogoutPressed = () => {
		if (loading) return;
		auth().signOut();
	};

	const onResendPressed = () => {
		auth().currentUser.reload();
		if (!auth().currentUser.emailVerified) {
			dispatch(setLoading(true));
			auth()
				.currentUser.sendEmailVerification()
				.then(() => {
					Toast.show({
						type: "success",
						message: "Verification email has been sent.",
					});
					dispatch(setLoading(false));
				})
				.catch((err) => {
					const { message } = err;

					Toast.show({
						type: "error",
						text1: message,
					});
					dispatch(setLoading(false));
				});
		}
	};

	return (
		<View style={styles.container}>
			<Image
				// eslint-disable-next-line global-require
				source={require("../assets/main-logo.png")}
				style={{ maxWidth: "85%", alignSelf: "center" }}
				resizeMode="contain"
			/>

			<Text style={styles.header}>Verify Account.</Text>

			<View style={styles.row}>
				<View style={styles.rowText}>
					<Text style={styles.text}>
						To verify your account respond to the verification
						email.
					</Text>
				</View>
			</View>
			<View style={styles.row}>
				<Text style={styles.text}>
					Didn&apos;t receive an email? Click below to resend.
				</Text>
			</View>
			<Button
				title="Resend Verification Email"
				buttonStyle={styles.button}
				containerStyle={styles.buttonContainer}
				titleStyle={styles.buttonTitle}
				loading={loading}
				onPress={onResendPressed}
			/>
			<Button
				title="Back to Login"
				buttonStyle={styles.button}
				containerStyle={styles.buttonContainer}
				titleStyle={styles.buttonTitle}
				loading={loading}
				onPress={onLogoutPressed}
			/>
		</View>
	);
}
