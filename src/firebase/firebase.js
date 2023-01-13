// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuhs1mVApPHL1DGTZthW126DA0QqsK43I",
  authDomain: "todo-acd23.firebaseapp.com",
  projectId: "todo-acd23",
  storageBucket: "todo-acd23.appspot.com",
  messagingSenderId: "271146004912",
  appId: "1:271146004912:web:6417e55a21831b3974e675",
  measurementId: "G-X48E3TQSPL",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
