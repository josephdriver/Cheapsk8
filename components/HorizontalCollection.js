import React from "react";
import { ScrollView } from "react-native";
import LargeCard from "./LargeCard";

function HorizontalCollection({ data }) {
  return (
    <ScrollView>
      <LargeCard data={data[0]} />
    </ScrollView>
  );
}

export default HorizontalCollection;
