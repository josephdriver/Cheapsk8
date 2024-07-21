/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useTheme, Text, Divider } from "@rneui/themed";

import IconImage from "./IconImage";

function DealItem({ deal, store, handlePress }) {
  const { theme } = useTheme();
  const noDiscount = useMemo(
    () => parseInt(deal.savings, 10) > 0,
    [deal.savings]
  );

  return (
    <View key={deal.storeID}>
      <Pressable onPress={() => handlePress(deal.dealID)}>
        <View style={styles.storeWrapper} key={deal.storeID}>
          <View style={styles.image}>
            <View style={{ flex: 1 }}>
              <IconImage url={store.images.logo} width={24} height={24} />
            </View>
          </View>
          <View style={[styles.title, { color: theme.colors.black }]}>
            <Text style={{ fontSize: 18 }}>{store.storeName}</Text>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: "row",
              justifyContent: noDiscount ? "space-between" : "flex-end",
            }}
          >
            {parseInt(deal.savings, 10) > 0 && (
              <View
                style={{
                  height: 21,
                  paddingHorizontal: 5,
                  backgroundColor: theme.colors.secondary,
                }}
              >
                <Text>-{deal.savings.split(".")[0]}%</Text>
              </View>
            )}
            <View>
              <Text style={{ fontWeight: "700", fontSize: 15 }}>
                ${deal.price || deal.salePrice}
              </Text>
            </View>
          </View>
        </View>
        <Divider />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  sectionHeading: {
    paddingVertical: 10,
  },
  storeWrapper: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    flex: 7,
  },
  dealTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
  },
  image: {
    flex: 1,
  },
});

export default DealItem;
