import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

// Componente de pantalla principal de la aplicación
export const HomeScreen = () => {
  return (
    // Contenedor principal de la pantalla
    <View style={styles.container}>
      {/* Avatar para mostrar la imagen del usuario */}
      <Avatar.Text size={55} label="DM" />
      {/* Texto de bienvenida */}
      <Text style={styles.welcomeText}>¡Bienvenido!</Text>
      {/* Descripción de la funcionalidad de la pantalla */}
      <Text style={styles.descriptionText}>
        Te encuentras en la pantalla principal de la aplicación. Desde aquí, puedes gestionar el envío y recepción de equipos de sonido.
      </Text>
    </View>
  );
};

// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fondo blanco
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold', // Negrita
    marginVertical: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center', // Alineado al centro
    paddingHorizontal: 20, // Espacio horizontal
    color: '#333333', // Texto oscuro
  },
});
