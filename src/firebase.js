// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { config } from "./config.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

const { firebase } = config;

const firebaseApp = initializeApp(firebase);

const db = getFirestore(firebaseApp);

const auth = getAuth();

export const createUserInfo = async () => {
	try {
		await addDoc(collection(db, "users"), {
			age: 25,
			height: 170,
			name: "USA",
			sex: "USA",
			weight: 60,
		});
	} catch (error) {
		throw new Error(error);
	}
};

export const register = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential;
	} catch (error) {
		throw new Error(error);
	}
};

export const login = async (email, password) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		return user;
	} catch (error) {
		throw new Error(error);
	}
};
