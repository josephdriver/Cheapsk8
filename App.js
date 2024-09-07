/* eslint-disable import/no-extraneous-dependencies */
import "react-native-gesture-handler";
import * as firebase from "@react-native-firebase/app";
import analytics from "@react-native-firebase/analytics";
import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Main from "./screens/Main";
import { persistor, store } from "./store";
import ErrorFallback from "./screens/ErrorFallback";

function App() {
  const theme = createTheme({
    mode: "dark",
  });

  firebase.initializeApp({});
  analytics().setAnalyticsCollectionEnabled(true);

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
          </PersistGate>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
