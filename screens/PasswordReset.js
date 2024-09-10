/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { View, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { emailValidator } from "../utilities/validators";
import styles from "../styles/loginStyles";

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
      <View style={styles.row}>
        <Text style={styles.rowText}>
          Enter your account email address to be sent an email containing a
          reset link.
        </Text>
      </View>
      <Input
        placeholder="Email"
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
