import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet } from "react-native";
import { STEAM_XL_CAP, STEAM_HEADER, DELIM_ID, BASE } from "../constants/Urls";

function HeaderImage({
  steamAppID,
  iconImage = false,
  isCap = false,
  fallback = false,
}) {
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
    <>
      <Image
        style={styles.mainImage}
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
    </>
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
