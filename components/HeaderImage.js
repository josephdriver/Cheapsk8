import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_XL_CAP, STEAM_HEADER, DELIM_ID } from "../constants/Urls";

function HeaderImage({ steamAppID, isCap = false }) {
  const imageURL = useMemo(
    () =>
      `${isCap ? STEAM_XL_CAP : STEAM_HEADER}`.replace(DELIM_ID, steamAppID),
    [steamAppID, isCap]
  );

  const fallbackUrl = useMemo(
    () => STEAM_XL_CAP.replace(DELIM_ID, steamAppID),
    [steamAppID]
  );

  return (
    <Image
      style={{ width: "100%", height: "100%" }}
      onError={() => fallbackUrl}
      source={{
        uri: imageURL,
      }}
    />
  );
}
HeaderImage.defaultProps = {
  steamAppID: null,
  isCap: false,
};

HeaderImage.propTypes = {
  steamAppID: PropTypes.string,
  isCap: PropTypes.bool,
};

export default HeaderImage;
