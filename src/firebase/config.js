// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
//Changes vars for testing

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};
//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyALp0M1ynqY4vpqR2veY06e2rVT54vzwN0",
//   authDomain: "test-journal-app-75898.firebaseapp.com",
//   projectId: "test-journal-app-75898",
//   storageBucket: "test-journal-app-75898.appspot.com",
//   messagingSenderId: "888947120513",
//   appId: "1:888947120513:web:b09647a8e113ece352b080"
// };
// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
