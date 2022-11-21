
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC-G6zA_hpn7spPiQIFR6YRYD3FlYvG2KQ",
    authDomain: "todo-firebase-a2f19.firebaseapp.com",
    projectId: "todo-firebase-a2f19",
    storageBucket: "todo-firebase-a2f19.appspot.com",
    messagingSenderId: "880949362859",
    appId: "1:880949362859:web:e30a9b886c33939db877ee"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


