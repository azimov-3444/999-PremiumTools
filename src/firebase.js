import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase konfiguratsiyasi
// Bu ma'lumotlarni Firebase Console dan olishingiz kerak
const firebaseConfig = {
    apiKey: "SIZNING_API_KEY",
    authDomain: "SIZNING_PROJECT_ID.firebaseapp.com",
    projectId: "SIZNING_PROJECT_ID",
    storageBucket: "SIZNING_PROJECT_ID.appspot.com",
    messagingSenderId: "SIZNING_SENDER_ID",
    appId: "SIZNING_APP_ID"
};

// Firebase ni ishga tushirish
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

export default app;
