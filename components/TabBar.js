import React from "react";
import { View, Pressable, StyleSheet, Animated } from "react-native";
import { useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { useSelector } from "react-redux";

import { FAVOURITE, INACTIVE, PRIMARY } from "../constants/Colours";
import { ANIMATED_CONFIG } from "../constants/Defaults";

function TabBar({ state: isActive, descriptors, navigation }) {
	const { favourites } = useSelector((state) => state.favourites);
	const { theme } = useTheme();

	const animation = new Animated.Value(0);
	const animated = new Animated.Value(1);
	const scale = animation.interpolate(ANIMATED_CONFIG.SPRING_RANGE);
	const fadeIn = () => {
		Animated.spring(animation, {
			toValue: 1,
			duration: ANIMATED_CONFIG.PRESS_DURATION.IN,
			useNativeDriver: true,
		}).start();
		Animated.timing(animated, {
			toValue: ANIMATED_CONFIG.PRESS_OPACITY.IN,
			duration: ANIMATED_CONFIG.PRESS_DURATION.IN,
			useNativeDriver: true,
		}).start();
	};
	const fadeOut = () => {
		Animated.spring(animation, {
			toValue: 0,
			duration: ANIMATED_CONFIG.PRESS_DURATION.OUT,
			useNativeDriver: true,
		}).start();
		Animated.timing(animated, {
			toValue: ANIMATED_CONFIG.PRESS_OPACITY.OUT,
			duration: ANIMATED_CONFIG.PRESS_DURATION.OUT,
			useNativeDriver: true,
		}).start();
	};

	return (
		<View style={{ flexDirection: "row" }}>
			{isActive.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = isActive.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				let alert = false;
				if (
					route.name === "heart" &&
					favourites &&
					favourites.length > 0
				) {
					favourites.forEach((f) => {
						if (
							f.alertTime &&
							(!f.lastSeen || f.alertTime > f.lastSeen)
						) {
							alert = true;
						}
					});
				}

				return (
					<Pressable
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						onPressIn={fadeIn}
						onPressOut={fadeOut}
						onPress={onPress}
						// onLongPress={onLongPress}
						style={[
							styles.tabBtn,
							{ backgroundColor: theme.colors.background },
						]}
					>
						<Animated.View
							styles={{
								flexDirection: "row",
								flexWrap: "wrap",
								opacity: animated,
								transform: [{ scale }],
							}}
						>
							{alert && <View style={styles.chip} />}
							<Icon
								name={route.name}
								color={isFocused ? PRIMARY : INACTIVE}
								size={28}
							/>
						</Animated.View>
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	tabBtn: {
		paddingVertical: 21,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	chip: {
		width: 13,
		height: 13,
		backgroundColor: FAVOURITE,
		borderRadius: 50,
		position: "absolute",
		top: -3,
		left: 20,
		zIndex: 1,
	},
});

export default TabBar;
