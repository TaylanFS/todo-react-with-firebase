import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB0rJ-xt6dL31UhfId7BOpSnKi27AKuJtM",
	authDomain: "todo-react-with-firebase-43715.firebaseapp.com",
	projectId: "todo-react-with-firebase-43715",
	storageBucket: "todo-react-with-firebase-43715.firebasestorage.app",
	messagingSenderId: "670916589312",
	appId: "1:670916589312:web:e2d2a9dc9cf8fde4a1a5e5",
	measurementId: "G-3B6XKVR008",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
