// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAV047-uCUTJyS91Ok29lMjw8AHckWyHhY",
    authDomain: "fsa-traningmaterials.firebaseapp.com",
    projectId: "fsa-traningmaterials",
    storageBucket: "fsa-traningmaterials.appspot.com",
    messagingSenderId: "1039901480540",
    appId: "1:1039901480540:web:8dabcb08ef3c8c32697899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);