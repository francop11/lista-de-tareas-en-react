// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPi2RXmGoVjFJ8PA1Z64Om2urN-Nc58D8",
  authDomain: "lista-de-tareas-e110c.firebaseapp.com",
  projectId: "lista-de-tareas-e110c",
  storageBucket: "lista-de-tareas-e110c.firebasestorage.app",
  messagingSenderId: "257910211020",
  appId: "1:257910211020:web:00b76b14b766c083941d69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {auth}