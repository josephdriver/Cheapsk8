import React from "react";
import PropTypes from "prop-types";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

function Loading({ message }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
  },
});

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loading;
