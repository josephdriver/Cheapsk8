/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Divider, Text, useTheme, Button } from "@rneui/themed";
import { useSelector } from "react-redux";
import IconImage from "./IconImage";
import DEFAULT_STORES from "../constants/Defaults";
import LargeCard from "./LargeCard";
import OneByTwoCard from "./OneByTwoCard";

function ContentBlock({ handleNavigate }) {
  const { dealBlocks } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);
  const { theme } = useTheme();

  function getStoreTitle(id) {
    if (stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.storeName;
    }
    return null;
  }

  function getStoreLogo(id) {
    if (stores.length > 0) {
      const storeName = stores.find((item) => item.storeID === id);
      return storeName.images.logo;
    }
    return null;
  }

  const renderItem = ({ item }) => {
    const storeIDs = savedStores.length > 0 ? savedStores : DEFAULT_STORES;
    if (storeIDs.find((store) => store.storeID === item.storeID)) {
      return (
        <View key={item.storeID} style={{ marginHorizontal: 10 }}>
          <View
            key={item.storeID}
            style={{
              flexDirection: "row",
              paddingBottom: 5,
            }}
          >
            <View style={styles.image}>
              <IconImage
                url={getStoreLogo(item.storeID)}
                width={30}
                height={30}
              />
            </View>
            <View style={{ flex: 9 }}>
              <Text h4 style={{ color: theme.colors.primary }}>
                {getStoreTitle(item.storeID)} Deals
              </Text>
            </View>
          </View>
          <Divider style={{ color: theme.colors.platform }} />

          <View
            style={{
              marginTop: 10,
            }}
          >
            {item.data.map((row) =>
              row.header ? (
                <LargeCard key={row.header.dealID} deal={row.header} />
              ) : (
                <OneByTwoCard key={row.row[0].dealID} deals={row.row} />
              )
            )}
          </View>
          <Button
            title={`...more from ${getStoreTitle(item.storeID)}`}
            type="clear"
            onPress={() => handleNavigate(item.storeID)}
            buttonStyle={{ justifyContent: "flex-end" }}
          />
        </View>
      );
    }
    return null;
  };

  if (dealBlocks && dealBlocks.length > 0) {
    return (
      <FlatList
        key={(item) => item.storeID}
        data={dealBlocks}
        renderItem={renderItem}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "center",
  },
});

export default ContentBlock;
