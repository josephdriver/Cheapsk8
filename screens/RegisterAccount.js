import React, { useState, useMemo } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Pressable, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { setUser, setLoading, setError } from "../redux/userSlice";
import { emailValidator, passwordValidator } from "../utilities/validators";
import styles from "../styles/loginStyles";
import errorMessage from "../utilities/firebaseErrorParsing";

export default function RegisterAccount() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setError(null));
    }, [dispatch])
  );

  const onSignUpPressed = () => {
    if (loading) return;
    dispatch(setLoading(true));
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(async (user) => {
        dispatch(setUser(user));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(err));
      });
  };

  const errMessage = useMemo(() => errorMessage(error), [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account.</Text>
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
        errorMessage={password.error || errMessage || ""}
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
