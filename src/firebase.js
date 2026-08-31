import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUkJBYQqCpOEvjGZEhjEQ_Xeb1FHr7J7Q",
  authDomain: "period-tracker-backend.firebaseapp.com",
  projectId: "period-tracker-backend",
  storageBucket: "period-tracker-backend.firebasestorage.app",
  messagingSenderId: "5383971824",
  appId: "1:5383971824:web:95f18fc3af10cc28a4f335",
  measurementId: "G-85FTSSLQ68"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; 