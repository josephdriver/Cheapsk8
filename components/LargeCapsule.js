import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import { Skeleton, useTheme } from "@rneui/themed";
import { STEAM_S_HEADER, DELIM_ID } from "../constants/Urls";

function LargeCapsule({ steamAppID, title, url }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const imageURL = useMemo(
    () =>
      steamAppID &&
      !title.toLowerCase().includes("edition") &&
      !title.toLowerCase().includes("collection") &&
      !title.toLowerCase().includes("bunlde") &&
      !title.toLowerCase().includes("pack")
        ? STEAM_S_HEADER.replace(DELIM_ID, steamAppID)
        : url,
    [steamAppID, title, url]
  );

  return (
    <View>
      <Image
        style={{ width: "100%", height: 70 }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{
          uri: imageURL,
        }}
      />
      {loading && (
        <View style={{ position: "absolute", left: -1 }}>
          <Skeleton
            animation="pulse"
            style={{ backgroundColor: theme.colors.grey3, borderRadius: 0 }}
            width={180}
            height={70}
          />
        </View>
      )}
    </View>
  );
}

LargeCapsule.defaultProps = {
  steamAppID: null,
  url: null,
};

LargeCapsule.propTypes = {
  steamAppID: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default LargeCapsule;
