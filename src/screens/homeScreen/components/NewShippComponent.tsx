import React, { useState } from 'react';
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../../configs/firebaseConfig';
import { push, ref, set } from 'firebase/database'; // Asumiendo que estás utilizando Firebase Realtime Database

// Interface para definir la estructura del formulario del pedido
interface OrderForm {
  customer: string;
  description: string;
  productType: string;
  total: number;
}

// Interface para definir los props del componente
interface Props {
  visible: boolean;
  setVisible: Function;
}

export const NewOrderComponent = ({ visible, setVisible }: Props) => {
  const [orderForm, setOrderForm] = useState<OrderForm>({
    customer: '',
    description: '',
    productType: '',
    total: 0,
  });

  // Función para actualizar el estado del formulario
  const handleSetOrderForm = (key: string, value: string | number) => {
    setOrderForm({ ...orderForm, [key]: value });
  };

  // Función para guardar el pedido en la base de datos
  const handleSaveOrder = async () => {
    if (!orderForm.customer || !orderForm.description || !orderForm.productType || !orderForm.total) {
      return;
    }

    const dbRef = ref(dbRealTime, 'orders');
    const newOrderRef = push(dbRef);

    try {
      await set(newOrderRef, orderForm);
      setOrderForm({
        customer: '',
        description: '',
        productType: '',
        total: 0,
      });
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }

    setVisible(false);
  };

  return (
    <Portal>
      <Modal visible={visible}>
        <View style={styles.modalContent}>
          <Text variant='headlineMedium'>Nuevo Pedido</Text>
          <IconButton icon='close' onPress={() => setVisible(false)} />
        </View>
        <Divider bold />
        <TextInput
          label='Cliente'
          mode='outlined'
          value={orderForm.customer}
          onChangeText={(value) => handleSetOrderForm('customer', value)}
          style={styles.input}
        />
        <TextInput
          label='Descripción'
          mode='outlined'
          value={orderForm.description}
          onChangeText={(value) => handleSetOrderForm('description', value)}
          style={styles.input}
        />
        <TextInput
          label='Tipo de Producto'
          mode='outlined'
          value={orderForm.productType}
          onChangeText={(value) => handleSetOrderForm('productType', value)}
          style={styles.input}
        />
        <TextInput
          label='Precio Total'
          mode='outlined'
          keyboardType='numeric'
          value={orderForm.total.toString()}
          onChangeText={(value) => handleSetOrderForm('total', parseFloat(value))}
          style={styles.input}
        />
        <Button style={styles.buttonContainer} mode='contained' onPress={handleSaveOrder}>Guardar</Button>
      </Modal>
    </Portal>
  );
};
