/* eslint-disable import/first */
if (__DEV__) {
  // eslint-disable-next-line global-require
  require("./ReactotronConfig");
}

/**
 * @format
 */

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

const handleJSErrorForSetJSExceptionHandler = (error) => {
  console.log("An error happened: ", error);
  // To do display and error dialog
};
AppRegistry.registerComponent(appName, () => App);
setJSExceptionHandler((error /* isFatal */) => {
  handleJSErrorForSetJSExceptionHandler(error);
}, true);

const exceptionhandler = (exceptionString) => {
  console.log("An error happened: ", exceptionString);
};

setNativeExceptionHandler(exceptionhandler, false);
export default handleJSErrorForSetJSExceptionHandler;
