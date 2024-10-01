import React from "react";
import PropTypes from "prop-types";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import { BACKGROUND_PRIMARY, PRIMARY, WHITE } from "../../constants/Colours";

function Loading({ message }) {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<ActivityIndicator size="large" color={PRIMARY} />
				<Text style={styles.message}>{message}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "space-around",
		backgroundColor: BACKGROUND_PRIMARY,
	},
	content: {
		width: "100%",
	},
	message: {
		textAlign: "center",
		marginHorizontal: 40,
		alignSelf: "center",
		color: WHITE,
	},
});

Loading.propTypes = {
	message: PropTypes.string.isRequired,
};

export default Loading;
