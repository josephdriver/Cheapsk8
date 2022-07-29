import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@rneui/themed";

import // SafeAreaView,
// StatusBar,
// StyleSheet,
// View,
// Text,
// ActivityIndicator,
"react-native";

import Main from "./screens/Main";

// SET CONSTANT FILTER PARAMS FOR HOTTEST DEALS - LIMIT 10

function App() {
  // const [appIsReady, setAppIsReady] = useState(true);

  // if (!appIsReady) {
  //   return (
  //     <SafeAreaView>
  //       <StatusBar barStyle="light-content" />
  //       <View style={styles.splashContainer}>
  //         <Text style={styles.title}>Stinjy.</Text>
  //         <ActivityIndicator size="large" color="white" />
  //       </View>
  //     </SafeAreaView>
  //   );
  // }
  // useEffect(() => {
  //   setMode("dark");
  // }, [setMode]);

  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   splashContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//   },
//   title: {
//     fontSize: 50,
//     fontWeight: "700",
//     paddingVertical: 10,
//     color: "white",
//   },
// });

export default App;
