import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { setUser, setLoading, setError } from "../redux/userSlice";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../utilities/validators";
import {
  SPLASH_BACKGROUND,
  WHITE,
  INFO_BACKGROUND,
} from "../constants/Colours";

export default function RegisterAccount() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.user);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = () => {
    if (loading) return;
    dispatch(setLoading(true));
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(async (user) => {
        dispatch(setUser({ ...user, name: name.value }));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(err));
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account.</Text>

      <Input
        placeholder="Name"
        errorStyle={styles.error}
        errorMessage={name.error || ""}
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.formContainer}
        inputStyle={styles.input}
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
      />
      <Input
        errorStyle={styles.error}
        errorMessage={email.error || ""}
        placeholder="Email"
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.formContainer}
        inputStyle={styles.input}
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        errorStyle={styles.error}
        errorMessage={password.error || ""}
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.formContainer}
        inputStyle={styles.input}
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
      />
      <Button
        title="Create Account"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        onPress={onSignUpPressed}
        loading={loading}
      />

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.text}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </Pressable>
        </View>
      </View>
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
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
    color: INFO_BACKGROUND,
  },
});
