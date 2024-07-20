import React from "react";
import PropTypes from "prop-types";
import { View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "@rneui/themed";

function Loading({ message }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "space-around",
        backgroundColor: theme.colors.grey5,
      }}
    >
      <View style={{ width: "100%" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ alignSelf: "center" }}>{message}</Text>
      </View>
    </View>
  );
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loading;
