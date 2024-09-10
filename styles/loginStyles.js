import { StyleSheet } from "react-native";

import {
  INFO_BACKGROUND,
  SPLASH_BACKGROUND,
  WHITE,
  INPUT_LIGHT_THEME,
  ERROR_TEXT,
} from "../constants/Colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPLASH_BACKGROUND,
    height: "100%",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: WHITE,
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    alignSelf: "center",
    width: "80%",
    paddingHorizontal: 0,
    marginVertical: 0,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    borderRadius: 100,
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    color: INPUT_LIGHT_THEME,
    fontSize: 15,
    height: 35,
    paddingVertical: 0,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: SPLASH_BACKGROUND,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 30,
    width: "80%",
    height: 40,
    paddingVertical: 0,
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  error: {
    color: ERROR_TEXT,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    color: WHITE,
    fontSize: 16,
    alignSelf: "center",
  },
  divider: {
    marginVertical: 20,
    borderWidth: 3,
    borderColor: WHITE,
    width: "70%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
  rowText: {
    flexDirection: "row",
    alignContent: "center",
    color: WHITE,
    textAlign: "center",
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
    color: INFO_BACKGROUND,
  },
});

export default styles;
