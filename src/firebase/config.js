// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBMuH5Py3ibO0D4NRorhuhYhXR8hqWF7I",
  authDomain: "reactjournal-262c9.firebaseapp.com",
  projectId: "reactjournal-262c9",
  storageBucket: "reactjournal-262c9.appspot.com",
  messagingSenderId: "302535128261",
  appId: "1:302535128261:web:99d664b0bfef2156d3ecac",
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
