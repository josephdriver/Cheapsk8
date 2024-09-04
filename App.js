import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./screens/Main";
import { persistor, store } from "./store";

function App() {
  const theme = createTheme({
    mode: "dark",
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
