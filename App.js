import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BACKGROUND_COLOUR, TEXT_COLOUR } from "./constants/Colours";
import useAxiosFetch from "./utilities/useAxiosFetch";
import { DEALS } from "./constants/Urls";
import Featured from "./screens/Featured";

// SET CONSTANT FILTER PARAMS FOR HOTTEST DEALS - LIMIT 10

// SET CONTSTANT FILTER PARAMS FOR STEAM - LIMIT 10
// SET CONTSTANT FILTER PARAMS FOR EPIC - LIMIT 10
// SET CONTSTANT FILTER PARAMS FOR GREENMAN - LIMIT 10

function App() {
  const [appIsReady, setAppIsReady] = useState(true);
  const [fetchBool, setFetchBool] = useState(false);

  const { data, error, loading } = useAxiosFetch(DEALS, [], 0, fetchBool, true);
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
    }
  }, [data]);

  if (!appIsReady) {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashContainer}>
          <Text style={styles.title}>Stinjy.</Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Featured" component={Featured} />
        <Tab.Screen name="Settings" component={Featured} />
      </Tab.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={{ height: '100%', backgroundColor: BACKGROUND_COLOUR }}>
    //     <StatusBar barStyle={'light-content'} />
    //     <ScrollView contentInsetAdjustmentBehavior="automatic">
    //         <View>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //             <Text style={styles.text}>Test</Text>
    //         </View>
    //     </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    paddingVertical: 10,
    color: "white",
  },
  pageContainer: {
    backgroundColor: BACKGROUND_COLOUR,
  },
  text: {
    color: TEXT_COLOUR,
  },
});

export default App;
