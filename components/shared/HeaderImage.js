import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, Skeleton } from "@rneui/themed";
import { Image, StyleSheet, View } from "react-native";

import {
  STEAM_XL_CAP,
  STEAM_HEADER,
  DELIM_ID,
  BASE,
} from "../../constants/Urls";

function HeaderImage({
  steamAppID,
  iconImage = false,
  isCap = false,
  fallback = false,
}) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  /**
   * Memoized image URL
   * If a fallback is provided and no steamAppID is provided, use the fallback
   */
  const imageURL = useMemo(
    () =>
      fallback && !steamAppID
        ? fallback
        : `${isCap ? STEAM_XL_CAP : STEAM_HEADER}`.replace(
            DELIM_ID,
            steamAppID
          ),
    [steamAppID, isCap, fallback]
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.mainImage}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{
          uri: imageURL,
        }}
      />
      {iconImage && (
        <Image
          style={styles.iconImage}
          source={{
            uri: `${BASE}/${iconImage}`,
          }}
        />
      )}
      {loading && (
        <View style={styles.loading}>
          <Skeleton
            animation="pulse"
            style={[styles.skeleton, { backgroundColor: theme.colors.grey3 }]}
            width={180}
            height={70}
          />
        </View>
      )}
    </View>
  );
}
HeaderImage.defaultProps = {
  steamAppID: null,
  iconImage: "",
  isCap: false,
  fallback: "",
};

HeaderImage.propTypes = {
  steamAppID: PropTypes.string,
  iconImage: PropTypes.string,
  isCap: PropTypes.bool,
  fallback: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  iconImage: {
    opacity: 0.9,
    position: "absolute",
    left: 6,
    top: 6,
    width: 34,
    height: 34,
  },
});

export default HeaderImage;
