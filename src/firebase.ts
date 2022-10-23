// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAyEhdhOKmBNFWlxuLEWXXJj1Gs_typFZA",

  authDomain: "berikan-625fc.firebaseapp.com",

  projectId: "berikan-625fc",

  storageBucket: "berikan-625fc.appspot.com",

  messagingSenderId: "678845874736",

  appId: "1:678845874736:web:46c358e1c7e8878b3ae3f5",

  measurementId: "G-BB0621V7KV",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const analytics = getAnalytics(app);
