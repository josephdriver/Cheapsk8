/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";

import { REDIRECT, DELIM_ID } from "../constants/Urls";
import Loading from "./Loading";

function WebViewWrapper({ route }) {
  const { url } = route.params;
  const [redirects, setRedirects] = useState(0);
  console.log(url);
  const redirect = useMemo(() => REDIRECT.replace(DELIM_ID, url), [url]);

  console.log(redirects);

  return (
    <View style={{ backgroundColor: "red", flex: 1 }}>
      {redirects < 3 && <Loading message="Loading.." />}
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

export default WebViewWrapper;
