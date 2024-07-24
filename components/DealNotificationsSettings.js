import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider, Slider } from "@rneui/themed";

import { TEXT_COLOUR_WHITE, FAVOURITE_YELLOW } from "../constants/Colours";

import { ALERT_LEVELS } from "../constants/Defaults";

function DealNotificationsSettings() {
  const [alertLevel, setAlertLevel] = useState(1);

  console.log(ALERT_LEVELS[alertLevel]);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Game Notifiations</Text>
        <Text>Get notified when:</Text>
        <Text
          style={{ alignSelf: "center", paddingVertical: 7, fontWeight: "700" }}
        >
          {ALERT_LEVELS[alertLevel]}
        </Text>
        <View style={styles.settingsContainer}>
          <View style={{ marginHorizontal: 10 }}>
            <Slider
              value={0}
              onValueChange={setAlertLevel}
              maximumValue={4}
              minimumValue={1}
              step={1}
              allowTouchTrack
              minimumTrackTintColor={FAVOURITE_YELLOW}
              trackStyle={{ height: 5, backgroundColor: TEXT_COLOUR_WHITE }}
              thumbStyle={{
                height: 30,
                width: 30,
                backgroundColor: FAVOURITE_YELLOW,
              }}
            />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: TEXT_COLOUR_WHITE,
  },
  settingsContainer: {
    flexDirection: "column",
  },
  optionsText: {
    flex: 2,
  },
  rowPadding: {
    paddingVertical: 10,
  },
});

export default DealNotificationsSettings;
