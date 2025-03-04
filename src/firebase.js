// firebase.js (or firebase-config.js)
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const updateUserProfile = (user, displayName) => {
  return updateProfile(user, { displayName });
};

const checkIfAdmin = () => {
  const user = auth.currentUser;
  return user && user.email === "arnas.ap.petraitis@gmail.com"; // Admin email
};

const addAvailableTimes = async (date, times) => {
  try {
    const availableTimesRef = collection(db, "availableTimes");
    await addDoc(availableTimesRef, {
      date: Timestamp.fromDate(new Date(date)),
      times: times,
    });
  } catch (error) {
    console.error('Error adding available times:', error);
  }
};

const getAvailableTimes = async (date) => {
  try {
    const availableTimesRef = collection(db, "availableTimes");
    const dateToTimestamp = new Date(date);
    const startOfDay = new Date(dateToTimestamp.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dateToTimestamp.setHours(23, 59, 59, 999));

    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    const q = query(
      availableTimesRef,
      where("date", ">=", startTimestamp),
      where("date", "<=", endTimestamp)
    );
    const querySnapshot = await getDocs(q);

    let times = [];
    querySnapshot.forEach((doc) => {
      times = doc.data().times;
    });

    return times;
  } catch (error) {
    console.error('Error fetching available times:', error);
    return [];
  }
};

export { app, auth, db, registerUser, signInUser, updateUserProfile, checkIfAdmin, addAvailableTimes, getAvailableTimes };
