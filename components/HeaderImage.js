import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { STEAM_FALL_BACK_XL, STEAM_XL_CAP, DELIM_ID } from "../constants/Urls";

function HeaderImage({ steamAppID }) {
  const [imageURl, setImageURL] = useState(
    STEAM_XL_CAP.replace(DELIM_ID, steamAppID)
  );

  const fallbackUrl = () => {
    setImageURL(STEAM_FALL_BACK_XL.replace(DELIM_ID, steamAppID));
  };

  return (
    <Image
      style={{ width: "100%", height: "100%" }}
      onError={() => {
        fallbackUrl();
      }}
      source={{
        uri: imageURl,
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
