import { BACKGROUND_PRIMARY } from "./Colours";

export const OPTIONS = { headerShown: false };
export const NAVIGATOR_OPTIONS = {
  cardStyle: { backgroundColor: BACKGROUND_PRIMARY },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  }),
};
