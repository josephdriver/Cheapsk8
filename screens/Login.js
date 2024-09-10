import React, { useState, useMemo, useCallback } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { emailValidator, passwordValidator } from "../utilities/validators";
import { setLoading, setError } from "../redux/userSlice";
import styles from "../styles/loginStyles";
import errorMessage from "../utilities/firebaseErrorParsing";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleToast = useCallback((message, type) => {
    const text = errorMessage(message) || "Unable to Log In at this time";
    Toast.show({
      type,
      text1: text,
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setError(null));
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
      .then(async () => {
        dispatch(setLoading(false));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(setError(message));
        handleToast(message, "error");
      });
  };

  const errMessage = useMemo(() => errorMessage(error), [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cheapsk8te.</Text>
      <View>
        <Input
          autoCapitalize="none"
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
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          errorStyle={styles.error}
          errorMessage={password.error || errMessage || ""}
          containerStyle={styles.formContainer}
          inputContainerStyle={styles.inputContainer}
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
