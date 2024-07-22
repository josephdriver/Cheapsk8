import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { View, Pressable } from "react-native";
import { Text, useTheme, Image, Skeleton } from "@rneui/themed";

import { STEAM_S_HEADER, DELIM_ID } from "../constants/Urls";

function ListItem({ deal, handleDealNavigate }) {
  const { theme } = useTheme();
  const imageURL = useMemo(
    () =>
      deal.steamAppID
        ? STEAM_S_HEADER.replace(DELIM_ID, deal.steamAppID)
        : deal.thumb,
    [deal.steamAppID, deal.thumb]
  );
  const [loading, setLoading] = useState(false);
  return (
    <Pressable
      onPress={() => handleDealNavigate(deal)}
      style={{
        width: "100%",
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 2,
      }}
    >
      <View
        style={{
          width: "97%",
          height: 110,
          backgroundColor: theme.colors.searchBg,
          flex: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Image
              resizeImage="cover"
              style={{
                width: 173.25,
                height: 80,
              }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri: imageURL,
              }}
            />
            {loading && (
              <View style={{ position: "absolute", left: -1 }}>
                <Skeleton
                  animation="pulse"
                  style={{ backgroundColor: theme.colors.grey3 }}
                  width={175.25}
                  height={80}
                />
              </View>
            )}
          </View>
          <View style={{ alignItems: "flex-end", margin: 5 }}>
            <Text>Cheapest Deal</Text>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              ${deal.cheapest}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            justifyContent: "space-around",
            backgroundColor: "#306187",
          }}
        >
          <Text
            style={{ color: "white", paddingHorizontal: 5, fontWeight: "700" }}
          >
            {deal.external}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

ListItem.propTypes = {
  deal: PropTypes.shape({
    gameID: PropTypes.string.isRequired,
    steamAppID: PropTypes.string,
    cheapest: PropTypes.string.isRequired,
    cheapestDealID: PropTypes.string.isRequired,
    external: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
  }).isRequired,
  handleDealNavigate: PropTypes.func,
};

ListItem.defaultProps = { handleDealNavigate: null };

export default ListItem;
