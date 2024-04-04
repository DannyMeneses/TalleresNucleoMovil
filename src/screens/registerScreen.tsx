import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme/styles'; // Importa los estilos

interface RegisterForm {
  email: string;
  password: string;
}

interface MessageSnackBar {
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  const navigation = useNavigation();

  // Estado para controlar si la contraseña está oculta o no
  const [hiddenPassword, setHiddenPassword] = useState(true);

  // Estado para almacenar los valores del formulario de registro
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: '',
    password: '',
  });

  // Estado para mostrar mensajes de Snackbar
  const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
    visible: false,
    message: '',
    color: '#ffffff',
  });

  // Función para actualizar el formulario de registro
  const handlerSetRegisterForm = (key: string, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  // Función para manejar el registro de usuario
  const handlerRegister = async () => {
    if (!registerForm.email || !registerForm.password) {
      setMessageSnackBar({
        visible: true,
        message: 'Complete los campos',
        color: '#962841',
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      setMessageSnackBar({
        visible: true,
        message: 'Registro exitoso',
        color: '#4CAF50', // Verde para éxito
      });
    } catch (e) {
      console.log(e);
      setMessageSnackBar({
        visible: true,
        message: 'Error al registrar. Por favor, inténtalo de nuevo.',
        color: '#f44336', // Rojo para errores
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Correo"
          placeholder="Escribe tu correo"
          onChangeText={(value) => handlerSetRegisterForm('email', value)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          secureTextEntry={hiddenPassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
          onChangeText={(value) => handlerSetRegisterForm('password', value)}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handlerRegister}
          labelStyle={styles.buttonText}
        >
          Registrarse
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
          onPress={() => navigation.navigate('Login')}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </View>
    </View>
  );
};
