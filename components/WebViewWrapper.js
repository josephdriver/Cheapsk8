import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { REDIRECT, DELIM_ID } from "../constants/Urls";
import Loading from "./shared/Loading";
import { LOADING_ARRAY, DELIMITER } from "../constants/Defaults";

function WebViewWrapper({ route }) {
	const { url, storeId } = route.params;
	const { stores } = useSelector((state) => state.stores);

	const store = useMemo(
		() => stores.find((s) => s.storeID === storeId),
		[stores, storeId]
	);

	const selectRandomElement = store
		? LOADING_ARRAY[
				Math.floor(Math.random() * LOADING_ARRAY.length)
		  ].replace(DELIMITER, store.storeName)
		: "Loading...";

	const [redirects, setRedirects] = useState(0);
	const [loadingMessage, setLoadingMessage] = useState(selectRandomElement);
	const redirect = useMemo(() => REDIRECT.replace(DELIM_ID, url), [url]);

	useEffect(() => {
		setLoadingMessage(selectRandomElement);
	}, [redirect, selectRandomElement]);

	return (
		<View style={styles.container}>
			{redirects < 3 && <Loading message={loadingMessage} />}
			<WebView
				source={{ uri: redirect }}
				startInLoadingState
				forceDarkOn
				onLoadProgress={({ nativeEvent }) => {
					if (nativeEvent.progress === 1) {
						setRedirects((prevState) => prevState + 1);
					}
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "red",
		flex: 1,
	},
});

WebViewWrapper.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			url: PropTypes.string.isRequired,
			storeId: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default WebViewWrapper;
