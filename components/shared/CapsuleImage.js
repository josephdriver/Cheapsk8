import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Image, View, StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";
import BlastedImage from "react-native-blasted-image";

import { STEAM_S_HEADER, DELIM_ID, BASE } from "../../constants/Urls";
import { SECONDARY } from "../../constants/Colours";
import { EXCLUDE_KEYWORDS } from "../../constants/Defaults";

function CapsuleImage({
  steamAppID = null,
  title,
  url = null,
  hasLogo = "",
  width = 340,
}) {
  const [loading, setLoading] = useState(true);

  /**
   * Memoized image URL
   * If a steamAppID is provided, use the steam header image
   * If the title contains an excluded keyword, use the provided URL
   */

  const imageURL = useMemo(() => {
    if (!steamAppID) return url;
    const containsExcludedKeyword = EXCLUDE_KEYWORDS.some((keyword) =>
      title.toLowerCase().includes(keyword)
    );
    return containsExcludedKeyword
      ? url
      : STEAM_S_HEADER.replace(DELIM_ID, steamAppID);
  }, [steamAppID, title, url]);

  return (
    <View style={styles.container}>
      <BlastedImage
        onLoad={() => setLoading(false)}
        source={{ uri: imageURL }}
        height={70}
        width={width}
      />
      {hasLogo && (
        <Image style={styles.logo} source={{ uri: `${BASE}/${hasLogo}` }} />
      )}
      {loading && (
        <View style={styles.loading}>
          <Skeleton animation="pulse" style={styles.skeletonImage} />
        </View>
      )}
    </View>
  );
}

CapsuleImage.propTypes = {
  steamAppID: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  hasLogo: PropTypes.string,
  width: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: SECONDARY,
  },
  skeletonImage: {
    width: "100%",
    height: "100%",
    backgroundColor: SECONDARY,
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
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default CapsuleImage;
