import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Order } from "./homeScreen/HomeScreen";
import { dbRealTime } from "../configs/firebaseConfig";
import { ref, remove, update } from "firebase/database";

export const DetailOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const { order } = route.params;

  const [detailForm, setDetailForm] = useState<Order>({
    id: "",
    customer: "",
    description: "",
    productType: "",
    total: 0
  });

  useEffect(() => {
    setDetailForm(order);
  }, []);

  // Función para actualizar el formulario de detalles
  const handlerSetDetailForm = (key: string, value: string | number) => {
    setDetailForm({ ...detailForm, [key]: value });
  };

  // Función para actualizar el pedido
  const handlerUpdateOrder = async () => {
    const dbRef = ref(dbRealTime, 'orders/' + detailForm.id);
    await update(dbRef, {
      description: detailForm.description,
      productType: detailForm.productType,
      total: detailForm.total
    });
    navigation.goBack();
  };

  // Función para eliminar un pedido
  const handlerDeleteOrder = async () => {
    const dbRef = ref(dbRealTime, 'orders/' + detailForm.id);
    await remove(dbRef);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.detailOrderContainer}>
        <Text variant="headlineSmall">Descripción</Text>
        <TextInput
          value={detailForm.description}
          onChangeText={(value) => handlerSetDetailForm('description', value)}
          style={styles.detailOrderInput}
        />
      </View>
      <Divider />
      <View>
        <Text variant="bodyLarge">Cliente: {detailForm.customer}</Text>
      </View>
      <Divider />
      <View style={styles.detailOrderContainer}>
        <Text>Tipo de Producto</Text>
        <TextInput
          value={detailForm.productType}
          onChangeText={(value) => handlerSetDetailForm('productType', value)}
          style={styles.detailOrderInput}
        />
      </View>
      <Divider />
      <View style={styles.detailOrderContainer}>
        <Text>Precio Total</Text>
        <TextInput
          value={detailForm.total.toString()}
          keyboardType="numeric"
          onChangeText={(value) => handlerSetDetailForm('total', parseFloat(value))}
          style={styles.detailOrderInput}
        />
      </View>
      <Button mode="contained" icon="email-sync" onPress={handlerUpdateOrder}>
        Actualizar
      </Button>
      <Button mode="contained" icon="email-remove" onPress={handlerDeleteOrder}>
        Eliminar
      </Button>
    </ScrollView>
  );
};
