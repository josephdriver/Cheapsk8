/* eslint-disable import/no-extraneous-dependencies */
import Reactotron, { asyncStorage } from "reactotron-react-native";
// import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({ name: "Cheaps8te" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(asyncStorage())
  //   .use(reactotronRedux())
  .connect(); // let's connect!

export default reactotron;
