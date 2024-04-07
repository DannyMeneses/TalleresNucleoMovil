import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { Order } from '../HomeScreen'; // Asumiendo que tienes una interfaz Order definida
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props {
  order: Order;
}

export const OrderCardComponent = ({ order }: Props) => {
  const navigation = useNavigation();

  const handleOrderDetails = () => {
    // Lógica para manejar los detalles del pedido, por ejemplo:
    navigation.dispatch(CommonActions.navigate({ name: 'OrderDetail', params: { order } }));
  };

  return (
    <View>
      <View>
        <Text variant='labelLarge'>Cliente: {order.customer}</Text>
        <Text variant='bodyMedium'>Descripción: {order.description}</Text>
        <Text variant='bodyMedium'>Tipo de producto: {order.productType}</Text>
        <Text variant='bodyMedium'>Precio Total: {order.total}</Text>
      </View>
      <View>
        <IconButton
          icon="email-open"
          size={25}
          onPress={handleOrderDetails}
        />
      </View>
    </View>
  );
};
