import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@rneui/themed";
import { Image, StyleSheet, View } from "react-native";
import BlastedImage from "react-native-blasted-image";

import { EXCLUDE_KEYWORDS } from "../../constants/Defaults";

import {
  STEAM_XL_CAP,
  STEAM_HEADER,
  DELIM_ID,
  BASE,
} from "../../constants/Urls";

function HeaderImage({
  steamAppID = null,
  iconImage = "",
  isCap = false,
  fallback = "",
  title = "",
  height = 160,
  width = 340,
}) {
  const [loading, setLoading] = useState(true);

  /**
   * Memoized image URL
   * If a fallback is provided and no steamAppID is provided, use the fallback
   */
  const imageURL = useMemo(() => {
    const containsExcludedKeyword = EXCLUDE_KEYWORDS.some((keyword) =>
      title.toLowerCase().includes(keyword)
    );

    if (!steamAppID || containsExcludedKeyword) return fallback;

    return fallback && !steamAppID
      ? fallback
      : `${isCap ? STEAM_XL_CAP : STEAM_HEADER}`.replace(DELIM_ID, steamAppID);
  }, [steamAppID, isCap, fallback, title]);

  return (
    <View style={styles.container}>
      <BlastedImage
        onLoad={() => setLoading(false)}
        source={{ uri: imageURL }}
        height={height}
        width={width}
        resizeMode="stretch"
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
          <Skeleton animation="pulse" style={[styles.skeletonImage]} />
        </View>
      )}
    </View>
  );
}

HeaderImage.propTypes = {
  steamAppID: PropTypes.string,
  iconImage: PropTypes.string,
  isCap: PropTypes.bool,
  fallback: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  skeletonImage: {
    width: "100%",
    height: "100%",
  },
  loading: {
    width: "100%",
    height: "100%",
    position: "absolute",
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
