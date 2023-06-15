import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import { Skeleton, useTheme } from "@rneui/themed";
import { STEAM_XL_CAP, DELIM_ID } from "../constants/Urls";

function LargeCapsule({ steamAppID, url }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [imageURl, setImageURL] = useState(
    STEAM_XL_CAP.replace(DELIM_ID, steamAppID)
  );

  const fallbackURl = () => {
    setImageURL(url);
  };

  return (
    <View>
      <Image
        style={{ width: "100%", height: 90 }}
        onError={() => fallbackURl()}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{
          uri: steamAppID ? imageURl : url,
        }}
      />
      {loading && (
        <View style={{ position: "absolute", left: -1 }}>
          <Skeleton
            animation="pulse"
            style={{ backgroundColor: theme.colors.grey3, borderRadius: 0 }}
            width={180}
            height={90}
          />
        </View>
      )}
    </View>
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
