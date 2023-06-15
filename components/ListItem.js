import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { View, Pressable } from "react-native";
import { Text, useTheme, Image, Skeleton } from "@rneui/themed";
import { useSelector } from "react-redux";

import IconImage from "./IconImage";
import { STEAM_L_CAP, DELIM_ID } from "../constants/Urls";

function ListItem({ deal, handleDealNavigate }) {
  const { stores } = useSelector((state) => state.stores);
  const { theme } = useTheme();
  const [imageURl, setImageURL] = useState(
    STEAM_L_CAP.replace(DELIM_ID, deal.steamAppID)
  );
  const [loading, setLoading] = useState(false);

  const getStoreLogo = useCallback(
    (id) => {
      if (stores.length > 0) {
        const storeName = stores.find((item) => item.storeID === id);
        return storeName.images.logo;
      }
      return null;
    },
    [stores]
  );

  const fallbackURl = () => {
    setImageURL(deal.thumb);
  };

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
          height: 92.25,
          backgroundColor: theme.colors.searchBg,
        }}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
          <>
            <Image
              resizeImage="cover"
              style={{
                width: 173.25,
                height: 65.25,
              }}
              onError={() => fallbackURl()}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri: deal.steamAppID ? imageURl : deal.thumb,
              }}
            />
            {loading && (
              <View style={{ position: "absolute", left: -1 }}>
                <Skeleton
                  animation="pulse"
                  style={{ backgroundColor: theme.colors.grey3 }}
                  width={175.25}
                  height={65.25}
                />
              </View>
            )}
          </>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              marginHorizontal: 5,
            }}
          >
            <View style={{ alignItems: "flex-end" }}>
              <View style={{ flexDirection: "column" }}>
                {parseInt(deal.savings, 10) !== 0 && (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        height: 21,
                        paddingHorizontal: 5,
                        backgroundColor: theme.colors.secondary,
                        marginHorizontal: 3,
                      }}
                    >
                      <Text>-{deal.savings.split(".")[0]}%</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          color: theme.colors.grey2,
                          fontSize: 15,
                          paddingBottom: 2,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ${deal.normalPrice}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontWeight: "700", fontSize: 15 }}>
                    ${deal.salePrice}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              {parseInt(deal.steamRatingPercent, 10) > 0 ||
              parseInt(deal.metacriticScore, 10) > 0 ? (
                <View>
                  {parseInt(deal.steamRatingPercent, 10) > 0 ? (
                    <Text>
                      {deal.steamRatingText} {deal.steamRatingPercent}%
                    </Text>
                  ) : (
                    <Text>Metacritic Score {deal.metacriticScore}</Text>
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", height: 27, marginHorizontal: 5 }}>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "700",
                fontSize: 16,
                paddingBottom: 1,
                color: theme.colors.primary,
              }}
            >
              {deal.title}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <IconImage
              url={getStoreLogo(deal.storeID)}
              width={23}
              height={23}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

ListItem.propTypes = {
  deal: PropTypes.shape({
    internalName: PropTypes.string,
    title: PropTypes.string,
    metacriticLink: PropTypes.string,
    dealID: PropTypes.string,
    storeID: PropTypes.string,
    gameID: PropTypes.string,
    salePrice: PropTypes.string,
    normalPrice: PropTypes.string,
    isOnSale: PropTypes.string,
    savings: PropTypes.string,
    metacriticScore: PropTypes.string,
    steamRatingText: PropTypes.string,
    steamRatingPercent: PropTypes.string,
    steamRatingCount: PropTypes.string,
    steamAppID: PropTypes.string,
    releaseDate: PropTypes.number,
    lastChange: PropTypes.number,
    dealRating: PropTypes.string,
    thumb: PropTypes.string,
  }).isRequired,
  handleDealNavigate: PropTypes.func,
};

ListItem.defaultProps = { handleDealNavigate: null };

export default ListItem;
