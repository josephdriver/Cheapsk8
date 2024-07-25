import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { dealType, gameType, dealListType } from "../../propTypes/props";
import {
  TEXT_COLOUR_WHITE,
  METACRITIC_SCORES,
  INFO_BACKGROUND,
} from "../../constants/Colours";

function GameInfoContainer({ gameData, data }) {
  const { cheapestPriceEver } = data;
  const { gameInfo } = gameData;

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
   * useMemo to determine the colour of the metacritic score
   * @returns {string} - colour of the metacritic score
   */
  const steamScore = useMemo(() => {
    if (!gameInfo) return null;
    if (gameInfo.steamRatingPercent >= 80) {
      return METACRITIC_SCORES.GOOD;
    }
    if (gameInfo.steamRatingPercent >= 50) {
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
          {gameInfo.publisher && <Text>{gameInfo.publisher}</Text>}
        </View>

        <View style={styles.info}>
          <View>
            {gameInfo.steamAppID && (
              <Text
                style={[
                  styles.bold,
                  {
                    color: steamScore,
                  },
                ]}
              >
                {gameInfo.steamRatingText} ({gameInfo.steamRatingPercent}%)
              </Text>
            )}
            {gameInfo.metacriticScore > 0 && (
              <Text
                style={[
                  styles.bold,
                  {
                    color: metacriticScore,
                  },
                ]}
              >
                {`Metacritic Score ${gameInfo.metacriticScore}/100`}
              </Text>
            )}
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
    color: TEXT_COLOUR_WHITE,
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: INFO_BACKGROUND,
  },
  gameInfo: {
    flex: 7,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "700",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  bold: {
    fontWeight: "700",
  },
});

GameInfoContainer.propTypes = {
  gameData: PropTypes.oneOfType([dealType, dealListType]).isRequired,
  data: gameType.isRequired,
};

export default GameInfoContainer;
