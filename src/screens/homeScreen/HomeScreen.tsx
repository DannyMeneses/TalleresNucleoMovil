import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import firebase from 'firebase/auth';
import { OrderCardComponent } from './components/ShippCarComponent';
import { NewOrderComponent } from './components/NewShippComponent';
import { onValue, ref } from 'firebase/database';

interface UserForm {
  name: string;
}

export interface Order {
  id: string;
  customer: string;
  description: string;
  productType: string;
  total: number;
}

export const HomeScreen = () => {
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>({ name: '' });
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setUserForm({ name: auth.currentUser?.displayName ?? '' });
    getAllOrders();
  }, []);

  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value });
  };

  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userAuth!, { displayName: userForm.name });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };

  const getAllOrders = () => {
    const dbRef = ref(dbRealTime, 'orders');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const getKeys = Object.keys(data);
        const listOrders: Order[] = [];
        getKeys.forEach((key) => {
          const value = { ...data[key], id: key };
          listOrders.push(value);
        });
        setOrders(listOrders);
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Avatar.Text size={55} label="CF" />
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Bienvenido</Text>
            <Text style={styles.userInfoText}>{userForm.name}</Text>
          </View>
          <View>
            <IconButton
              icon="cog"
              size={30}
              mode="contained"
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={orders}
            renderItem={({ item }) => <OrderCardComponent order={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile}>
          <View>
            <Text>Mi Perfil</Text>
            <IconButton icon="close" onPress={() => setShowModalProfile(false)} />
          </View>
          <Divider />
          <View>
            <TextInput
              mode="outlined"
              label="Nombre"
              value={userForm.name}
              onChangeText={(value) => handlerUpdateUserForm('name', value)}
            />
            <TextInput mode="outlined" label="Correo" value={userAuth?.email!} disabled />
          </View>
          <Button mode="contained" onPress={() => handlerUpdateUser()}>
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB icon="plus" onPress={() => setShowModalOrder(true)} />
      <NewOrderComponent visible={showModalOrder} setVisible={setShowModalOrder} />
    </>
  );
};
