import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4lgTEJa59YpZRwXxJ-wmFzP9JHBbDh_k",
  authDomain: "olx-react-clone-4448a.firebaseapp.com",
  projectId: "olx-react-clone-4448a",
  storageBucket: "olx-react-clone-4448a.appspot.com",
  messagingSenderId: "262732738454",
  appId: "1:262732738454:web:546062179315582bcef7b7"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)