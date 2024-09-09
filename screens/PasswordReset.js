/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { emailValidator } from "../utilities/validators";
import {
  WHITE,
  SPLASH_BACKGROUND,
  INFO_BACKGROUND,
} from "../constants/Colours";

export default function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const sendResetPasswordEmail = () => {
    setLoading(true);
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      setLoading(false);
      return;
    }

    auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Reset Email Sent",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Encountered a problem sending reset instructions.",
        });
      });

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Password.</Text>
      <Input
        style={{ marginBottom: 10, backgroundColor: "white", width: "100%" }}
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        errorStyle={styles.error}
        errorMessage={email.error || ""}
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.formContainer}
        inputStyle={styles.input}
      />
      <Button
        title="Request Reset Email"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        loading={loading}
        onPress={sendResetPasswordEmail}
      />
    </View>
  );
}

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
    paddingVertical: 35,
    color: WHITE,
    textAlign: "center",
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
    color: "black",
    textDecoration: "none",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    backgroundColor: SPLASH_BACKGROUND,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 30,
    width: "80%",
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  error: {
    color: WHITE,
    fontSize: 14,
    alignSelf: "flex-start",
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
    width: "80%",
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
