import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { styles } from "../theme/styles";

interface LoginForm {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const navigation = useNavigation();

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [messageSnackBar, setMessageSnackBar] = useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const handlerSetLoginForm = (key: string, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const handlerLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setMessageSnackBar({
        visible: true,
        message: "Complete todos los campos",
        color: "#962841",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
    } catch (error) {
      console.log(error);
      setMessageSnackBar({
        visible: true,
        message: "Usuario y/o contraseña incorrecta",
        color: "#f44336",
      });
    }
  };

  return (
    <View>
      <Text variant="headlineMedium">Inicia Sesión</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handlerSetLoginForm("email", value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        onChangeText={(value) => handlerSetLoginForm("password", value)}
      />
      <Button
        mode="contained"
        onPress={handlerLogin}
        
        labelStyle={styles.buttonText}
      >
        Iniciar
      </Button>
      <Snackbar
        visible={messageSnackBar.visible}
        onDismiss={() => setMessageSnackBar({ ...messageSnackBar, visible: false })}
        style={{ backgroundColor: messageSnackBar.color }}
      >
        {messageSnackBar.message}
      </Snackbar>
      <Text
        style={styles.textNavigation}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}
      >
        No tienes una cuenta? Regístrate ahora
      </Text>
    </View>
  );
};
