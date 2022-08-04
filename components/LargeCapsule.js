import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_L_CAP, STEAM_XL_CAP, DELIM_ID } from "../constants/Urls";

function LargeCapsule({ steamAppID, url }) {
  const [imageURl, setImageURL] = useState(
    STEAM_XL_CAP.replace(DELIM_ID, steamAppID)
  );

  const fallbackURl = () => {
    setImageURL(STEAM_L_CAP.replace(DELIM_ID, steamAppID));
  };

  return (
    <Image
      style={{ width: "100%", height: 90 }}
      onError={() => fallbackURl()}
      source={{
        uri: steamAppID ? imageURl : url,
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
