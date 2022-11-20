import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyAiS7rgByI1iLFsEYjIaSBuf25eQXNUuo0",
    authDomain: "todo-firebase-9fa8c.firebaseapp.com",
    projectId: "todo-firebase-9fa8c",
    storageBucket: "todo-firebase-9fa8c.appspot.com",
    messagingSenderId: "850447057206",
    appId: "1:850447057206:web:290e07393ad0e5b0247397"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);