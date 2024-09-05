import React from "react";
import { SafeAreaView, Text, Pressable, View, StyleSheet } from "react-native";
import { func, shape, string } from "prop-types";
import { useTheme } from "@rneui/themed";

import { INFO_BACKGROUND } from "../constants/Colours";

function ErrorFallback({ error, resetError }) {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.grey5 }]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>
          Looks like we have run into an error.
        </Text>
        {error && <Text style={styles.error}>{error.message}</Text>}
        <Pressable style={styles.button} onPress={resetError}>
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: INFO_BACKGROUND,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  error: {
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

ErrorFallback.propTypes = {
  error: shape({ errorMessage: string }).isRequired,
  resetError: func.isRequired,
};

export default ErrorFallback;
