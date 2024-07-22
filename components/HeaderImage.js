import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_XL_CAP, STEAM_HEADER, DELIM_ID, BASE } from "../constants/Urls";

function HeaderImage({
  steamAppID,
  iconImage = false,
  isCap = false,
  fallback = false,
}) {
  const imageURL = useMemo(() => {
    if (fallback && !steamAppID) {
      return fallback;
    }

    return `${isCap ? STEAM_XL_CAP : STEAM_HEADER}`.replace(
      DELIM_ID,
      steamAppID
    );
  }, [steamAppID, isCap, fallback]);

  return (
    <>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: imageURL,
        }}
      />
      {iconImage && (
        <Image
          style={{
            opacity: 0.9,
            position: "absolute",
            left: 6,
            top: 6,
            width: 34,
            height: 34,
          }}
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

export default HeaderImage;
