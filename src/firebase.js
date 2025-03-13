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
  apiKey: "AIzaSyD5JIsT8jpsLB8SuwCoH9b8kIhaWCiEN9g",
  authDomain: "pathfide.firebaseapp.com",
  projectId: "pathfide", 
  storageBucket: "pathfide.appspot.com",
  messagingSenderId: "908851760661",
  appId: "1:914346132615:android:8cbf3aadbf113e69d22422",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db = getFirestore(app);
export default app;

