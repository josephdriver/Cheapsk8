import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Image, View, StyleSheet } from "react-native";
import { Skeleton, useTheme } from "@rneui/themed";
import { STEAM_S_HEADER, DELIM_ID, BASE } from "../constants/Urls";

function CapsuleImage({ steamAppID, title, url, hasLogo }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  /**
   * Memoized image URL
   * If a steamAppID is provided, use the steam header image
   * If the title contains an excluded keyword, use the provided URL
   */
  const imageURL = useMemo(() => {
    if (!steamAppID) return url;
    const lowerTitle = title.toLowerCase();
    const excludedKeywords = ["edition", "collection", "bundle", "pack"];
    const containsExcludedKeyword = excludedKeywords.some((keyword) =>
      lowerTitle.includes(keyword)
    );
    return containsExcludedKeyword
      ? url
      : STEAM_S_HEADER.replace(DELIM_ID, steamAppID);
  }, [steamAppID, title, url]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{ uri: imageURL }}
      />
      {hasLogo && (
        <Image style={styles.logo} source={{ uri: `${BASE}/${hasLogo}` }} />
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

CapsuleImage.defaultProps = {
  steamAppID: null,
  url: null,
  hasLogo: "",
};

CapsuleImage.propTypes = {
  steamAppID: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  hasLogo: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 70,
  },
  logo: {
    opacity: 0.9,
    position: "absolute",
    left: 3,
    top: 3,
    width: 23,
    height: 23,
  },
  loading: {
    position: "absolute",
    left: -1,
  },
  skeleton: {
    borderRadius: 0,
  },
});

export default CapsuleImage;
