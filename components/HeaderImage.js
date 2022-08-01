import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_XL_CAP, DELIM_ID } from "../constants/Urls";

function HeaderImage({ steamAppID }) {
  return (
    <Image
      style={{ width: "100%", height: "100%" }}
      source={{
        uri: `${STEAM_XL_CAP.replace(DELIM_ID, steamAppID)}`,
      }}
    />
  );
}
HeaderImage.defaultProps = {
  steamAppID: null,
};

HeaderImage.propTypes = {
  steamAppID: PropTypes.string,
};

export default HeaderImage;
