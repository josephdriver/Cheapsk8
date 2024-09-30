export const ALERT_LEVELS = {
  1: { id: 1, label: "Do not notify me", threshold: "never" },
  2: { id: 2, label: "Any Discount", threshold: 0 },
  3: { id: 3, label: "10% Off", threshold: 10 },
  4: { id: 4, label: "25% Off", threshold: 25 },
  5: { id: 5, label: "50% Off", threshold: 50 },
  6: { id: 6, label: "75% Off", threshold: 75 },
  7: { id: 7, label: "90% Off", threshold: 90 },
  8: { id: 8, label: "Lowest Ever", threshold: "cheapest" },
};

export const LARGE_SPINNER = "large";

// 20 minutes
export const DEALS_CACHE_OFFSET = 1000 * 60 * 20;
// 6 hours
export const FAVOURITES_CACHE_OFFSET = 1000 * 60 * 60 * 6;

export const EXCLUDE_KEYWORDS = ["edition", "collection", "bundle", "pack"];

export const ANIMATED_PRESS_DURATION = {
  IN: 50,
  OUT: 150,
};

export const ANIMATED_OPACITY = {
  IN: 0.7,
  OUT: 1,
};

export const ANIMATED_SPRING_RANGE = {
  inputRange: [0, 1],
  outputRange: [1, 0.95],
};

export const ANIMATED_CONFIG = {
  PRESS_DURATION: ANIMATED_PRESS_DURATION,
  PRESS_OPACITY: ANIMATED_OPACITY,
  SPRING_RANGE: ANIMATED_SPRING_RANGE,
};

export const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const DELIMITER = "DELIMITER";
export const LOADING_ARRAY = [
  "Hacking the DELIMITER mainframe...",
  "Praising our lord and saviour Gabe...",
  "Personally contacting DELIMITER with your request...",
  'Sacrificing "volunteer" Pokemon to the deal gods...',
  "Almost there, I swear...",
  "Super close now. For realsies... ",
  "What are you going to buy with all the money you saved?",
  "Entering hostile negotiations with DELIMITER...",
  "Getting to the chopper...",
  "Is this spinner broken?",
  "Just ducking out for a quick coffee...",
  "James wishes he makes Apps as good as this...",
];
