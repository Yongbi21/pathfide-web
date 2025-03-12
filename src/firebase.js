// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: import.meta.env.REACT_APP_FIREBASE_DATABASE,
//     projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCFSTDqn08ZIJ4GxD5HM4FNYpuWKJ2wQ7U",
  authDomain: "mindpath-5f93b.firebaseapp.com",
  projectId: "mindpath-5f93b", 
  storageBucket: "mindpath-5f93b.appspot.com",
  messagingSenderId: "908851760661",
  appId: "1:908851760661:android:ee744e33fc6c0c84da481c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db = getFirestore(app);
export default app;

