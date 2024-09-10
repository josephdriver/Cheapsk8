import { StyleSheet } from "react-native";

import {
  SECONDARY,
  PRIMARY,
  WHITE,
  TEXT_DARK,
  DANGER,
} from "../constants/Colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
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
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    color: TEXT_DARK,
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
    backgroundColor: PRIMARY,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 10,
    width: "80%",
    height: 40,
    paddingVertical: 0,
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  error: {
    color: DANGER,
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
    color: SECONDARY,
  },
});

export default styles;
