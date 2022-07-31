import React from "react";
import { View, Image, Text } from "react-native";
import { STEAM_HEADER, DELIM_ID } from "../constants/Urls";

function LargeCard(data) {
  console.log(data);
  if (!data || data.data) {
    return null;
  }
  return (
    <View key={data[0].dealID}>
      <View>
        <Image
          style={{ width: 300, height: 200 }}
          source={{
            uri: `${STEAM_HEADER.replace(DELIM_ID, data[0].steamAppID)}`,
          }}
        />
      </View>
      <Text>{data[0].title}</Text>
    </View>
  );
}

export default LargeCard;
