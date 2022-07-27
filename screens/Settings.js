/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

function Settings() {
  //   const [search, setSearch] = useState("");

  //   const updateSearch = (e) => {
  //     setSearch(e);
  //   };

  return (
    <View style={styles.view}>
      <ScrollView>
        {/* <>
          {favoritesData.map((item) => (
            <View key={item.storeId}>
              <Text>Store {item.storeId}</Text>
              {item.data.map((row) => (
                <View key={row.dealId}>
                  <Text>{row.title}</Text>
                </View>
              ))}
            </View>
          ))}
        </> */}
        <Text>Test</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
  },
});

export default Settings;
