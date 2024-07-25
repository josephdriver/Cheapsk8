import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/dist/FontAwesome";

import { INACTIVE_NAV_ICON } from "../constants/Colours";

function TabBar({ state, descriptors, navigation }) {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabBtn,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <View styles={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Icon
                name={route.name}
                color={isFocused ? theme.colors.primary : INACTIVE_NAV_ICON}
                size={24}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBtn: {
    paddingVertical: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default TabBar;
