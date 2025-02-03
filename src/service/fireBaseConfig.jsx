// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIAdGSb25pRsSKFOZzlDASajAPXiFQbqI",
  authDomain: "trip-project-d594f.firebaseapp.com",
  projectId: "trip-project-d594f",
  storageBucket: "trip-project-d594f.appspot.com",

  messagingSenderId: "243319664185",
  appId: "1:243319664185:web:eb8d820f78f8b49d0b27e8",
  measurementId: "G-WWC99LRCYY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Firebase Storage
const db = getFirestore(app); 
// const analytics = getAnalytics(app);
export { storage, ref, uploadBytes, getDownloadURL, db };