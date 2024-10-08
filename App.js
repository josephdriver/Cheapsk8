/* eslint-disable import/no-extraneous-dependencies */
import BootSplash from "react-native-bootsplash";
import "react-native-gesture-handler";
import * as firebase from "@react-native-firebase/app";
import analytics from "@react-native-firebase/analytics";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";

import Main from "./screens/Main";
import { persistor, store } from "./store";
import ErrorFallback from "./screens/ErrorFallback";

function App() {
	// Ignore warning for defaultProps for the slider component
	LogBox.ignoreLogs([
		"Warning: Slider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
	]);
	const theme = createTheme({
		mode: "dark",
	});

	useEffect(() => {
		const register = async () => {
			const firebaseConfig = {
				apiKey: "AIzaSyBuQYH6uo8km0JpSVF4IBz7L7wHTvkqvYU",
				authDomain: "cheapsk8te-597a2.firebaseapp.com",
				projectId: "cheapsk8te-597a2",
				appId: "1:1042550224698:android:943b70ea55e51e8cd34203",
				databaseURL: "https://cheapsk8te-597a2.firebaseio.com",
			};

			firebase.initializeApp(firebaseConfig);
		};

		if (!firebase.getApps().length) {
			register();
		} else {
			BootSplash.hide({ fade: true });
			analytics().setAnalyticsCollectionEnabled(true);
		}
	}, []);

	const handleJSErrorForErrorBoundary = (error, stackTrace) => {
		console.log("ErrorBoundary", error, stackTrace);
	};

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ErrorBoundary
					onError={handleJSErrorForErrorBoundary}
					FallbackComponent={ErrorFallback}
				>
					<PersistGate loading={null} persistor={persistor}>
						<Main />
						<Toast />
					</PersistGate>
				</ErrorBoundary>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
