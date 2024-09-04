import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable } from "react-native";
import { useTheme, Text, Divider } from "@rneui/themed";

import IconImage from "./IconImage";
import { dealPropTypes, storeType } from "../../propTypes/props";
import { DISCOUNT_BOX, TEXT_COLOUR_WHITE } from "../../constants/Colours";

function StoreOffer({ deal, store, handlePress }) {
  const { theme } = useTheme();

  return (
    <View key={deal.storeID}>
      <Pressable onPress={() => handlePress(deal.dealID)}>
        <View style={styles.dealContainer} key={deal.storeID}>
          <View style={{ flex: 1 }}>
            <IconImage url={store.images.logo} width={24} height={24} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.dealTitle}>{store.storeName}</Text>
          </View>
          <View
            style={[
              styles.priceContainer,
              {
                justifyContent:
                  parseInt(deal.savings, 10) > 0 ? "space-between" : "flex-end",
              },
            ]}
          >
            {parseInt(deal.savings, 10) > 0 && (
              <View style={styles.discountPercent}>
                <Text>-{deal.savings.split(".")[0]}%</Text>
              </View>
            )}
            <View>
              <Text style={styles.price}>${deal.price || deal.salePrice}</Text>
            </View>
          </View>
        </View>
        <Divider />
      </Pressable>
    </View>
  );
}

StoreOffer.propTypes = {
  deal: dealPropTypes.isRequired,
  store: storeType.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  dealContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  titleContainer: {
    flex: 7,
  },
  dealTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 1,
  },
  priceContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  discountPercent: {
    height: 21,
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: DISCOUNT_BOX,
  },
  price: {
    fontWeight: "700",
    fontSize: 15,
  },
});

export default StoreOffer;
