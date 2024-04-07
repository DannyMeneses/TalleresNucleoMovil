import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import{getDatabase} from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyDWhWr_rZfHfouraCo9C_KO8jKAGTTVQp8",
    authDomain: "tallernucleo3.firebaseapp.com",
    projectId: "tallernucleo3",
    storageBucket: "tallernucleo3.appspot.com",
    messagingSenderId: "1062252305319",
    appId: "1:1062252305319:web:2b9a138d4a61c944917482",
    databaseURL:"https://tallernucleo3-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime=getDatabase(app)