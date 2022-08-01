import React from "react";
import { ThemeProvider } from "@rneui/themed";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./screens/Main";
import { persistor, store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
