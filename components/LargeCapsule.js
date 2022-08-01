import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_XL_CAP, DELIM_ID } from "../constants/Urls";

function LargeCapsule({ steamAppID, url }) {
  return (
    <Image
      style={{ width: "100%", height: 90 }}
      source={{
        uri: `${steamAppID ? STEAM_XL_CAP.replace(DELIM_ID, steamAppID) : url}`,
      }}
    />
  );
}

LargeCapsule.defaultProps = {
  steamAppID: null,
  url: null,
};

LargeCapsule.propTypes = {
  steamAppID: PropTypes.string,
  url: PropTypes.string,
};

export default LargeCapsule;
