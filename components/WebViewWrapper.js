import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";

import { REDIRECT, DELIM_ID } from "../constants/Urls";
import Loading from "./Loading";

function WebViewWrapper({ route }) {
  const { url } = route.params;
  const [redirects, setRedirects] = useState(0);
  const redirect = useMemo(() => REDIRECT.replace(DELIM_ID, url), [url]);

  return (
    <View style={styles.container}>
      {redirects < 3 && <Loading message="Loading..." />}
      <WebView
        source={{ uri: redirect }}
        startInLoadingState
        forceDarkOn
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            setRedirects((prevState) => prevState + 1);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
  },
});

WebViewWrapper.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WebViewWrapper;
