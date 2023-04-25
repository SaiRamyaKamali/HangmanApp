import firebase from 'firebase/compat/app'; 
// import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDNXghqOkZ728NceEQbSLrW178Nxuma8m0",
    authDomain: "hangman-2188f.firebaseapp.com",
    projectId: "hangman-2188f",
    storageBucket: "hangman-2188f.appspot.com",
    messagingSenderId: "981284646086",
    appId: "1:981284646086:web:61bd745b36ccc3ed10fbc7"
  };

const firebaseApp =   firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;