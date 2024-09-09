import React, { useState, useMemo } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Input, Button /* Divider */ } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { emailValidator, passwordValidator } from "../utilities/validators";
import { setUser, setLoading, setError } from "../redux/userSlice";
import {
  INFO_BACKGROUND,
  SPLASH_BACKGROUND,
  WHITE,
} from "../constants/Colours";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setError(false));
    }, [dispatch])
  );

  const onLoginPressed = () => {
    if (loading) return;
    dispatch(setLoading(true));
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      dispatch(setLoading(false));
      return;
    }

    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(async (user) => {
        dispatch(setUser(user));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(setError(message));
      });
  };

  const errorMessage = useMemo(() => {
    if (error) {
      return error.replace(" ", "$").split("$", 2)[1];
    }
    return "";
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cheapsk8te.</Text>
      <View>
        <View style={styles.row}>
          <Text style={styles.rowText}>{errorMessage}</Text>
        </View>
        <Input
          placeholder="Email"
          errorStyle={styles.error}
          errorMessage={email.error || ""}
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          shake={!!email.error}
          containerStyle={styles.formContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
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
      </View>
      <Button
        title="Log In With Email"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        loading={loading}
        onPress={onLoginPressed}
      />
      {/*  Below is for more sign in options */}
      {/* <View>
      <Divider style={styles.divider} />
      </View>
      <Button
        title="Log In With Email"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        disabled={loading}
        onPress={onLoginPressed}
      />
      <Button
        title="Log In With Email"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        disabled={loading}
        onPress={onLoginPressed}
      /> */}
      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.text}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate("PasswordReset")}>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
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
    height: 50,
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
