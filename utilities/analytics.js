/* eslint-disable import/no-extraneous-dependencies */
import analytics from "@react-native-firebase/analytics";

const GAME = "game";
const SEARCH = "search";
const HOME = "home";
const SETTINGS = "settings";
export const SCREEN_CLASSES = {
  GAME,
  SEARCH,
  HOME,
  SETTINGS,
};

/**
 *
 * @param {string} event - Name of the event
 * @param {Object} params - Parameters of the event
 */
export const logEvent = (event, params) => {
  analytics().logEvent(event, params);
};

/**
 *
 * @param {Object} details - Details of the screen
 * @param {string} details.screen_name - Name of the screen
 * @param {string} details.screen_class - Class of the screen
 */
export const logScreenView = (params) => {
  analytics().logScreenView(params);
};

/**
 *
 * @param {Object} search - Search term
 * @param {string} search.search_term - Name of the screen
 */
export const logSearch = (params) => {
  analytics().logSearch(params);
};
