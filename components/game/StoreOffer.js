import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { Text, Divider } from "@rneui/themed";

import IconImage from "../shared/IconImage";
import { dealPropTypes, favouriteType, storeType } from "../../propTypes/props";
import { DISCOUNT, FAVOURITE } from "../../constants/Colours";
import { ANIMATED_CONFIG } from "../../constants/Defaults";
import { gameAlerts } from "../../utilities/dealAlerts";

function StoreOffer({ deal, store, handlePress, favourite = null }) {
	// Check if the deal is an alert
	const isAlert = useMemo(() => {
		if (!favourite) return false;
		const { isAlert: alert } = gameAlerts(deal, favourite);
		return alert;
	}, [deal, favourite]);

	// Animation for the pressable
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
		<View key={deal.storeID}>
			<Pressable
				onPress={() => handlePress(deal)}
				onPressIn={fadeIn}
				onPressOut={fadeOut}
			>
				<Animated.View
					style={[
						styles.dealContainer,
						{
							opacity: animated,
							transform: [{ scale }],
							borderRightColor: isAlert
								? FAVOURITE
								: "transparent",
							borderRightWidth: isAlert ? 7 : 0,
						},
					]}
					key={deal.storeID}
				>
					<View style={{ flex: 1, paddingLeft: 7 }}>
						<IconImage
							url={store.images.logo}
							width={24}
							height={24}
						/>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.dealTitle}>{store.storeName}</Text>
					</View>
					<View
						style={[
							styles.priceContainer,
							{
								justifyContent:
									parseInt(deal.savings, 10) > 0
										? "space-between"
										: "flex-end",
								paddingRight: isAlert ? 7 : 14,
							},
						]}
					>
						{parseInt(deal.savings, 10) > 0 && (
							<View style={styles.discountPercent}>
								<Text>-{deal.savings.split(".")[0]}%</Text>
							</View>
						)}
						<View>
							<Text style={styles.price}>
								${deal.price || deal.salePrice}
							</Text>
						</View>
					</View>
				</Animated.View>
				<Divider />
			</Pressable>
		</View>
	);
}

StoreOffer.propTypes = {
	deal: dealPropTypes.isRequired,
	store: storeType.isRequired,
	handlePress: PropTypes.func.isRequired,
	favourite: favouriteType,
};

const styles = StyleSheet.create({
	dealContainer: {
		flexDirection: "row",
		paddingVertical: 10,
		paddingHorizontal: 5,
	},
	titleContainer: {
		flex: 7,
	},
	dealTitle: {
		fontWeight: "bold",
		fontSize: 15,
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
		backgroundColor: DISCOUNT,
	},
	price: {
		fontWeight: "700",
		fontSize: 15,
	},
});

export default StoreOffer;
