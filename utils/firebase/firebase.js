// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// import firebase from 'firebase/app'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { useCollection } from "react-firebase-hooks/firestore";

// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import * as admin from 'firebase-admin'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// console.log(process.env);

/**
 * const origin = window.location.origin;
    let isLocal = origin.includes("localhost");
    let apiBase = isLocal
      ? "http://localhost:8500/api"
      : "https://externaltools.zuri.chat/api";
    // let apiBase = "https://externaltools.zuri.chat/api";
    const url = `${apiBase}/tools?sortBy=collections`;
 */

// * DEVELOPMENT CREDENTIALS
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// const isDevelopment = window.location.origin.includes("localhost");
// const firebaseConfig = isDevelopment
//   ? {
//       apiKey: process.env.NEXT_PUBLIC_DEV_FIREBASE_API_KEY,
//       authDomain: process.env.NEXT_PUBLIC_DEV_FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.NEXT_PUBLIC_DEV_FIREBASE_PROJECT_ID,
//       storageBucket: process.env.NEXT_PUBLIC_DEV_FIREBASE_STORAGE_BUCKET,
//       messagingSenderId:
//         process.env.NEXT_PUBLIC_DEV_FIREBASE_MESSAGING_SENDER_ID,
//       appId: process.env.NEXT_PUBLIC_DEV_FIREBASE_APP_ID,
//       measurementId: process.env.NEXT_PUBLIC_DEV_FIREBASE_MEASUREMENT_ID,
//     }
//   : {
//       apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//       authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//       appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//       measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
//     };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
