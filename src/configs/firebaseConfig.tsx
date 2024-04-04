import { initializeApp } from "firebase/app"; 
import {initializeAuth,getReactNativePersistence  } from "firebase/auth"; 

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDWhWr_rZfHfouraCo9C_KO8jKAGTTVQp8",
    authDomain: "tallernucleo3.firebaseapp.com",
    projectId: "tallernucleo3",
    storageBucket: "tallernucleo3.appspot.com",
    messagingSenderId: "1062252305319",
    appId: "1:1062252305319:web:2b9a138d4a61c944917482"
};

const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
