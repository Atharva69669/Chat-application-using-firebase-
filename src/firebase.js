
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD8S4q1cdq1eqSSA6uU1xEDUaLtI-aptdI",
  authDomain: "chatapp-50e7b.firebaseapp.com",
  projectId: "chatapp-50e7b",
  storageBucket: "chatapp-50e7b.appspot.com",
  messagingSenderId: "736208655672",
  appId: "1:736208655672:web:970b9c4fa7b9e65c669dcd",
  measurementId: "G-C2160ZY81X"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);