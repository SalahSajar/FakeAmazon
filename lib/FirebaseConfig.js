import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const FBconfig = {
  apiKey: "AIzaSyA3GfRgwU722DukADmR5_9q24ESETixciI",
  authDomain: "fake-a8f59.firebaseapp.com",
  projectId: "fake-a8f59",
  storageBucket: "fake-a8f59.appspot.com",
  messagingSenderId: "896655945524",
  appId: "1:896655945524:web:a267749883d45c10107f61",
  measurementId: "G-LYLM8DQKGH"
};

export const app = initializeApp(FBconfig);

export const auth = getAuth(app);
export const db = getFirestore(app);