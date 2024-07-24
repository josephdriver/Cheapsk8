import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

import { METACRITIC_SCORES } from "../constants/Colours";
import { dealType, gameListType } from "../propTypes/dealType";

function DealInfoContainer({ gameData, data }) {
  const { cheapestPriceEver } = data;
  const { gameInfo } = gameData;
  console.log(gameData);
  console.log(data);
  /**
   * useMemo to determine the colour of the metacritic score
   * @returns {string} - colour of the metacritic score
   */
  const metacriticScore = useMemo(() => {
    if (!gameInfo) return null;
    if (gameInfo.metacriticScore >= 80) {
      return METACRITIC_SCORES.GOOD;
    }
    if (gameInfo.metacriticScore >= 50) {
      return METACRITIC_SCORES.AVERAGE;
    }
    return METACRITIC_SCORES.BAD;
  }, [gameInfo]);

  /**
   * useMemo to convert the date from seconds to a readable format
   * @returns {string} - formatted date
   */
  const secondsToDate = useMemo(() => {
    if (!data) return null;
    const date = new Date(data.cheapestPriceEver.date * 1000);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [data]);

  return (
    <View style={styles.infoContainer}>
      <View style={styles.gameInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.dealTitle}>{gameInfo.name}</Text>
          <Text>
            {gameInfo.publisher && `Publisher: ${gameInfo.publisher}`}
          </Text>
        </View>

        <View style={styles.info}>
          <View>
            <Text>
              {gameInfo.steamAppID
                ? `${gameInfo.steamRatingText} (${gameInfo.steamRatingPercent}%)`
                : ` `}
            </Text>
            <Text
              style={{
                color: metacriticScore,
              }}
            >
              {gameInfo.metacriticScore > 0
                ? `Metacritic Score ${gameInfo.metacriticScore}`
                : ` `}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.alignEnd}>
        <Text style={styles.bold}>Lowest Ever</Text>
        <Text style={styles.bold}>{`$${cheapestPriceEver.price}`}</Text>
        <Text style={styles.bold}>{secondsToDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 10,
  },
  dealTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#306187",
  },
  gameInfo: {
    flex: 7,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "500",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  bold: {
    fontWeight: "700",
  },
});

DealInfoContainer.propTypes = {
  gameData: dealType.isRequired,
  data: gameListType.isRequired,
};

export default DealInfoContainer;
