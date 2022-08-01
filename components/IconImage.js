import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { BASE } from "../constants/Urls";

function IconImage({ url, width, height }) {
  return (
    <Image
      style={{ width, height }}
      source={{
        uri: `${BASE}/${url}`,
      }}
    />
  );
}

IconImage.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default IconImage;
