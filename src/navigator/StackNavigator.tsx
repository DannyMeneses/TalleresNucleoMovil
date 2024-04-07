import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/loginScreen";
import { RegisterScreen } from "../screens/registerScreen";
import { HomeScreen } from "../screens/homeScreen/HomeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface Routes {
  name: string;
  screen: () => JSX.Element;
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
  // Estado para verificar si el usuario está autenticado
  const [isAuth, setIsAuth] = useState(false);
  // Estado para controlar el estado de carga
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false); // Cambiar el estado de carga a falso una vez que la verificación esté completa
      if (user) {
        setIsAuth(true); // Establecer estado de autenticación como verdadero si hay un usuario autenticado
      }
    });
    // Devuelve una función para realizar la limpieza
    return () => unsubscribe();
  }, []);

  // Definir rutas para usuarios no autenticados
  const routesNoAuth: Routes[] = [
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen },
  ];

  // Definir rutas para usuarios autenticados
  const routesAuth: Routes[] = [{ name: "Home", screen: HomeScreen }];

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        // Mostrar indicador de carga mientras se verifica la autenticación
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={35} />
        </View>
      ) : (
        // Renderizar el StackNavigator una vez que la verificación esté completa
        <Stack.Navigator>
          {isAuth
            ? routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))
            : routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))}
        </Stack.Navigator>
      )}
    </View>
  );
};
