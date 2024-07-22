import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_XL_CAP, STEAM_HEADER, DELIM_ID } from "../constants/Urls";

function HeaderImage({ steamAppID, isCap = false, fallback = false }) {
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
    <Image
      style={{ width: "100%", height: "100%" }}
      source={{
        uri: imageURL,
      }}
    />
  );
}
HeaderImage.defaultProps = {
  steamAppID: null,
  isCap: false,
  fallback: "",
};

HeaderImage.propTypes = {
  steamAppID: PropTypes.string,
  isCap: PropTypes.bool,
  fallback: PropTypes.string,
};

export default HeaderImage;
