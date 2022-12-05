// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDk1uWqRBJfWH7VeLSRQRPkZrVF2De-R0M',
    authDomain: 'cryptobase-626dd.firebaseapp.com',
    projectId: 'cryptobase-626dd',
    storageBucket: 'cryptobase-626dd.appspot.com',
    messagingSenderId: '915964512560',
    appId: '1:915964512560:web:c61a7623d23879571860f5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


