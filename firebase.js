
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQmXNRk0BUJ7J3LzkfoeJPo1Ty-0ehfh8",
  authDomain: "chat-app-75339.firebaseapp.com",
  projectId: "chat-app-75339",
  storageBucket: "chat-app-75339.appspot.com",
  messagingSenderId: "376437666756",
  appId: "1:376437666756:web:c9e4179340235f44cbea91"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()