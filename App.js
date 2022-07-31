import React from "react";
import { ThemeProvider } from "@rneui/themed";

import Main from "./screens/Main";

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
