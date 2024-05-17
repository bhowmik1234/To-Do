
import { initializeApp } from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD436FgLvXmMXc16TMlVErVe2TsQvsmH6o",
  authDomain: "to-do-482d8.firebaseapp.com",
  projectId: "to-do-482d8",
  storageBucket: "to-do-482d8.appspot.com",
  messagingSenderId: "1077325828523",
  appId: "1:1077325828523:web:ff6c24bf66dc7f467242ee"
};

const app = initializeApp(firebaseConfig);
export default app;