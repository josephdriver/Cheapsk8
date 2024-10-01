import React, { useMemo, useCallback, useState } from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	Animated,
	Image,
} from "react-native";
import { func } from "prop-types";
import { useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { useSelector } from "react-redux";

import { BASE } from "../../constants/Urls";
import { favouriteType } from "../../propTypes/props";
import CapsuleImage from "../shared/CapsuleImage";
import { WHITE, SECONDARY, FAVOURITE, DISCOUNT } from "../../constants/Colours";
import { ANIMATED_CONFIG } from "../../constants/Defaults";
import { favouriteCollectionAlerts } from "../../utilities/dealAlerts";

function ListItem({ item, handleOnPress }) {
	const [width, setWidth] = useState(null);
	const { stores } = useSelector((state) => state.stores);
	const { theme } = useTheme();

	const { isLowest, isAlert } = useMemo(
		() => favouriteCollectionAlerts(item),
		[item]
	);

	const lowestStore = useMemo(() => {
		const store = stores.find((s) => s.storeID === item.lowestStoreId);
		return store;
	}, [item, stores]);
	/**
	 * Handle navigation to the deal screen
	 */
	const handlePress = useCallback(
		() => handleOnPress(item),
		[item, handleOnPress]
	);

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
		<View style={styles.wrapper}>
			<Pressable
				onPress={handlePress}
				style={styles.container}
				onPressIn={fadeIn}
				onPressOut={fadeOut}
			>
				<Animated.View
					style={[
						styles.innerContainer,
						{
							backgroundColor: theme.colors.searchBg,
							opacity: animated,
							transform: [{ scale }],
							borderRightColor: isAlert
								? FAVOURITE
								: "transparent",
							borderRightWidth: isAlert ? 7 : 0,
						},
					]}
				>
					<View style={styles.imageRowContainer}>
						<View
							style={styles.imageContainer}
							onLayout={(e) =>
								setWidth(e.nativeEvent.layout.width)
							}
						>
							{width && (
								<CapsuleImage
									steamAppID={item.steamId}
									title={item.title}
									url={item.thumb}
									width={width}
								/>
							)}
						</View>

						<View>
							<View
								style={[
									styles.priceContainer,
									{
										paddingRight: isAlert ? 5 : 10,
									},
								]}
							>
								<View>
									{item.alertTime &&
										(!item.lastSeen ||
											item.lastSeen < item.alertTime) && (
											<View
												style={{
													flex: 1,
													alignItems: "flex-end",
												}}
											>
												<Icon
													name="bell"
													color={FAVOURITE}
													size={18}
													style={{
														paddingRight: 5,
														paddingTop: 5,
													}}
												/>
											</View>
										)}
									<View style={{ flexDirection: "row" }}>
										{parseFloat(item.highestPercent) >
											0 && (
											<View
												style={styles.discountPercent}
											>
												<Text>
													-
													{
														item.highestPercent.split(
															"."
														)[0]
													}
													%
												</Text>
											</View>
										)}
										<View
											style={{
												height: 21,
												minWidth: 40,
											}}
										>
											<Text
												style={{
													fontWeight: "700",
													textAlign: "right",
												}}
											>
												${item.lowestPrice}
											</Text>
										</View>
									</View>
								</View>
							</View>
							<View
								style={{
									paddingRight: isAlert ? 5 : 10,
									paddingBottom: 5,
								}}
							>
								{item.dealCount > 1 && (
									<Text style={styles.italic}>
										{item.dealCount - 1} more offers
									</Text>
								)}
							</View>
						</View>
					</View>

					<View style={styles.gameTitleContainer}>
						<View style={{ flexShrink: 1 }}>
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								style={styles.gameTitleText}
							>
								{item.title}
							</Text>
						</View>
						<View
							style={{
								flexGrow: 1,
								paddingRight: isAlert ? 5 : 10,
								alignItems: "flex-end",
							}}
						>
							<View style={{ flexDirection: "row" }}>
								{isLowest && (
									<Text style={styles.alertText}>
										Lowest Ever
									</Text>
								)}
								{lowestStore && (
									<Image
										style={styles.iconImage}
										source={{
											uri: `${BASE}/${lowestStore.images.logo}`,
										}}
									/>
								)}
							</View>
						</View>
					</View>
				</Animated.View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginHorizontal: 10,
	},
	container: {
		width: "100%",
		alignItems: "center",
		marginVertical: 5,
		borderRadius: 2,
	},
	priceContainer: {
		flex: 1,
		// paddingBottom: 5,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	discountPercent: {
		height: 21,
		paddingHorizontal: 5,
		marginHorizontal: 2,
		backgroundColor: DISCOUNT,
	},
	innerContainer: {
		width: "100%",
		height: 100,
		flex: 1,
	},
	imageRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	imageRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	imageContainer: { width: 180, height: 70 },
	dealTextContainer: {
		alignItems: "flex-end",
		marginHorizontal: 10,
		marginVertical: 5,
	},
	gameTitleContainer: {
		height: "100%",
		flex: 1,
		flexDirection: "row",
		backgroundColor: SECONDARY,
		alignItems: "center",
	},
	gameTitleText: {
		color: WHITE,
		paddingHorizontal: 5,
		fontWeight: "700",
	},
	iconImage: {
		opacity: 0.9,
		marginLeft: 5,
		width: 24,
		height: 24,
	},
	alertText: {
		color: FAVOURITE,
		fontWeight: "700",
	},
	italic: { fontStyle: "italic" },
});

ListItem.propTypes = {
	item: favouriteType.isRequired,
	handleOnPress: func.isRequired,
};

export default ListItem;
