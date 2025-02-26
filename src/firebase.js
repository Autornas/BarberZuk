
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyANQ5S8US5P5X9oRF6o3SzJ2bopTs52kaw", 
  authDomain: "barberzuk.firebaseapp.com", 
  projectId: "barberzuk", 
  storageBucket: "barberzuk.firebasestorage.app", 
  messagingSenderId: "442919694774", 
  appId: "1:442919694774:web:e400a13e6a487fa7645117", 
  measurementId: "G-JXXMBF4C9F", 
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app); 


export { app, analytics, auth, createUserWithEmailAndPassword, updateProfile };
