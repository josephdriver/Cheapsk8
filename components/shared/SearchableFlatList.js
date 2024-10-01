import React from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { SearchBar } from "@rneui/themed";
import {
	oneOfType,
	arrayOf,
	string,
	func,
	bool,
	elementType,
	shape,
} from "prop-types";
import { favouriteType, gameListType } from "../../propTypes/props";
import { BACKGROUND_PRIMARY, WHITE } from "../../constants/Colours";

function SearchableFlatList({
	inputValue,
	handleInputChange,
	data = [],
	handlePaginate = null,
	renderFooter = null,
	loading = false,
	handleDealNavigate,
	ListItem,
	ListEmptyComponent,
	autoFocus = false,
	isSearchable = true,
}) {
	return (
		<>
			{isSearchable && (
				<View
					style={{
						flexDirection: "row",
						height: 70,
					}}
				>
					<View style={{ flex: 10 }}>
						<SearchBar
							autoFocus={autoFocus}
							placeholder="Cheapsk8"
							onChangeText={(e) => handleInputChange(e)}
							value={inputValue}
							round={2}
							showLoading={loading}
							containerStyle={[
								styles.containerStyle,
								{
									backgroundColor: BACKGROUND_PRIMARY,
								},
							]}
							inputStyle={styles.input}
						/>
					</View>
					<View style={{ flex: 2, paddingEnd: 10 }}>
						<Image
							// eslint-disable-next-line global-require
							source={require("../../assets/main-short-logo.png")}
							style={{
								maxWidth: "100%",
								height: 66,
								alignSelf: "center",
							}}
							resizeMode="contain"
						/>
					</View>
				</View>
			)}

			<View
				style={{
					paddingTop: isSearchable ? 0 : 10,
					paddingBottom: isSearchable ? 70 : 0,
				}}
			>
				<FlatList
					data={data}
					initialNumToRender={60}
					maxToRenderPerBatch={60}
					onEndReached={handlePaginate || null}
					onEndReachedThreshold={2}
					renderItem={({ item }) => (
						<ListItem
							key={item.gameID}
							item={item}
							handleOnPress={handleDealNavigate}
						/>
					)}
					ListFooterComponent={renderFooter}
					ListEmptyComponent={ListEmptyComponent}
				/>
			</View>
		</>
	);
}

SearchableFlatList.propTypes = {
	inputValue: string.isRequired,
	handleInputChange: func.isRequired,
	data: arrayOf(oneOfType([gameListType, favouriteType])),
	handlePaginate: func,
	renderFooter: func,
	loading: bool,
	handleDealNavigate: func.isRequired,
	ListItem: elementType.isRequired,
	ListEmptyComponent: oneOfType([shape({}), elementType]).isRequired,
	autoFocus: bool,
	isSearchable: bool,
};

export default SearchableFlatList;

const styles = StyleSheet.create({
	containerStyle: {
		borderBottomColor: "transparent",
		borderTopColor: "transparent",
	},
	input: {
		fontSize: 18,
		color: WHITE,
	},
});
