// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdcu_GmF26AWTJa44iFU_qaJzM3AR4fEk",
  authDomain: "myplace-264b1.firebaseapp.com",
  projectId: "myplace-264b1",
  storageBucket: "myplace-264b1.appspot.com",
  messagingSenderId: "717139375567",
  appId: "1:717139375567:web:9caa50eaa9d83915ffceba",
  measurementId: "G-JSJKBYZFMY",
  databaseURL:
    "https://myplace-264b1-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use getAuth to get the Authentication instance
export const storage = getStorage(app);
auth.languageCode = "it";

export { app, auth };
