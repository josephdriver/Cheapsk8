/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useMemo } from "react";
import analytics from "@react-native-firebase/analytics";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from "@rneui/themed";

import { fetchDeals, setLoading } from "../redux/dealsSlice";
import { fetchWatchList } from "../redux/favouritesSlice";
import { DEALS_CACHE_OFFSET } from "../constants/Defaults";
import FeaturedDeals from "../components/home/FeaturedDeals";
import Loading from "../components/shared/Loading";
import { BACKGROUND_PRIMARY } from "../constants/Colours";
import { getGamesToUpdate } from "../utilities/dealAlerts";

function Home({ navigation }) {
	const dispatch = useDispatch();
	const { deals, loading, offset, fetchTime } = useSelector(
		(state) => state.deals
	);
	const { user } = useSelector((state) => state.user);
	const { savedStores, stores } = useSelector((state) => state.stores);
	const { favourites } = useSelector((state) => state.favourites);

	const getParams = useMemo(
		() => ({
			storeID:
				savedStores.length > 0
					? savedStores.map((s) => s.storeID)
					: stores.map((s) => s.storeID),
			onSale: 1,
			sortBy: "reviews",
			desc: 0,
			AAA: 1,
			pageNumber: offset || 0,
		}),
		[offset, savedStores, stores]
	);

	const triggerDealFetch = useCallback(() => {
		dispatch(fetchDeals(getParams));
	}, [dispatch, getParams]);

	useFocusEffect(
		React.useCallback(() => {
			analytics().logScreenView({
				screen_name: "Home",
				screen_class: "Home",
			});
		}, [])
	);

	useFocusEffect(
		React.useCallback(() => {
			if (
				deals.length === 0 ||
				fetchTime + DEALS_CACHE_OFFSET < new Date().getTime()
			) {
				dispatch(setLoading(true));
				triggerDealFetch();
			}

			const watchListIds = getGamesToUpdate(favourites);
			if (watchListIds && watchListIds.length <= 25) {
				dispatch(fetchWatchList(watchListIds, favourites, user));
			}
		}, [triggerDealFetch, deals, fetchTime, dispatch, favourites, user])
	);

	const handleDealNavigate = useCallback(
		(deal) => {
			navigation.navigate("Deal", {
				deal,
			});
		},
		[navigation]
	);

	const handleSearchNavigate = useCallback(
		() => navigation.navigate("Search"),
		[navigation]
	);

	const handlePageIncrement = useCallback(() => {
		if (!loading) {
			dispatch(
				fetchDeals({ ...getParams, pageNumber: offset + 1 }, true)
			);
		}
	}, [loading, dispatch, getParams, offset]);

	if (loading && !offset) {
		return <Loading message="Getting the latest deals... Hold tight!" />;
	}

	return (
		<View style={styles.view}>
			<Pressable onPress={() => handleSearchNavigate()}>
				<SearchBar
					placeholder="Find a game"
					round={2}
					editable={false}
					containerStyle={{
						backgroundColor: BACKGROUND_PRIMARY,
						borderBottomColor: "transparent",
						borderTopColor: "transparent",
					}}
				/>
			</Pressable>

			<View style={{ paddingBottom: 80 }}>
				<FeaturedDeals
					pageNumber={offset}
					handlePageIncrement={handlePageIncrement}
					deals={deals}
					loading={loading}
					handleDealNavigate={handleDealNavigate}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		height: "100%",
		backgroundColor: BACKGROUND_PRIMARY,
	},
});

export default Home;
