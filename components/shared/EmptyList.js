import React from "react";
import { string } from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import { WHITE } from "../../constants/Colours";

function EmptyList({ message }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-around",
  },
  content: {
    width: "100%",
  },
  message: {
    alignSelf: "center",
    color: WHITE,
    padding: 20,
    textAlign: "center",
  },
});

EmptyList.propTypes = {
  message: string.isRequired,
};

export default EmptyList;
