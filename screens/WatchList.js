/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback, useMemo } from "react";
import analytics from "@react-native-firebase/analytics";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import SearchableFlatList from "../components/shared/SearchableFlatList";
import ListItem from "../components/favourites/ListItem";
import EmptyList from "../components/shared/EmptyList";
import { BACKGROUND_PRIMARY } from "../constants/Colours";
import { getGamesToUpdate } from "../utilities/dealAlerts";
import { fetchWatchList } from "../redux/favouritesSlice";
import Loading from "../components/shared/Loading";

function WatchList({ navigation }) {
	const dispatch = useDispatch();
	const { favourites, loading } = useSelector((state) => state.favourites);
	const { user } = useSelector((state) => state.user);
	const message = useMemo(
		() =>
			"You have not watch listed any games yet. Search for Titles on the Home screen and add them to your watch list.",
		[]
	);

	const [inputValue, setInputValue] = useState("");

	useFocusEffect(
		React.useCallback(() => {
			analytics().logScreenView({
				screen_name: "Watchlist",
				screen_class: "Watchlist",
			});

			const watchListIds = getGamesToUpdate(favourites);
			if (watchListIds && watchListIds.length <= 25) {
				dispatch(fetchWatchList(watchListIds, favourites, user));
			}
		}, [dispatch, favourites, user])
	);

	const handleDealNavigate = useCallback(
		(item) => {
			const deal = {
				gameID: item.gameId,
				steamAppID: item.steamAppID,
				external: item.title,
				thumb: item.thumb,
				cheapest: item.lowestPrice,
			};

			navigation.navigate("Deal", { deal });
		},
		[navigation]
	);

	const sortedFavourites = useMemo(
		() =>
			favourites.slice().sort((a, b) => {
				const nameA = a.title.toUpperCase();
				const nameB = b.title.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}

				// names must be equal
				return 0;
			}),
		[favourites]
	);

	if (loading) {
		return <Loading message="Getting the latest deals... Hold tight!" />;
	}

	return (
		<View style={styles.view}>
			<SearchableFlatList
				autoFocus={false}
				inputValue={inputValue}
				data={sortedFavourites}
				handleDealNavigate={handleDealNavigate}
				handleInputChange={setInputValue}
				ListItem={ListItem}
				ListEmptyComponent={<EmptyList message={message} />}
				isSearchable={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		border: "none",
		height: "100%",
		backgroundColor: BACKGROUND_PRIMARY,
	},
});
export default WatchList;
