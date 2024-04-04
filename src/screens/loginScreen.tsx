import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../theme/styles'; // Importa los estilos

interface LoginForm {
  email: string;
  password: string;
}

interface MessageSnackBar {
  visible: boolean;
  message: string;
  color: string;
}

export const LoginScreen = () => {
  // Estado para controlar si la contraseña está oculta o no
  const [hiddenPassword, setHiddenPassword] = useState(true);
  // Objeto de navegación
  const navigation = useNavigation();

  // Estado para almacenar los valores del formulario de inicio de sesión
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  // Estado para mostrar mensajes de Snackbar
  const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
    visible: false,
    message: '',
    color: '#ffffff',
  });

  // Función para actualizar el formulario de inicio de sesión
  const handlerSetLoginForm = (key: string, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  // Función para manejar el inicio de sesión
  const handlerLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setMessageSnackBar({
        visible: true,
        message: 'Complete los campos',
        color: '#962841',
      });
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      setMessageSnackBar({
        visible: true,
        message: 'Usuario y/o contraseña incorrecta',
        color: '#f44336', // Color rojo para errores
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Correo"
          placeholder="Escribe tu correo"
          onChangeText={(value) => handlerSetLoginForm('email', value)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          secureTextEntry={hiddenPassword}
          right={<TextInput.Icon name="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
          onChangeText={(value) => handlerSetLoginForm('password', value)}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handlerLogin}
          labelStyle={styles.buttonText}
        >
          Iniciar Sesión
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
          ¿No tienes una cuenta? Regístrate ahora
        </Text>
      </View>
    </View>
  );
};
