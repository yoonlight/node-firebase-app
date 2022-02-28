// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { config } from "../config.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";

const { firebase } = config;

initializeApp(firebase);

const auth = getAuth();

export const register = async (email, password) => {
	try {
		const actionCodeSettings = {
			url: `https://${config.firebase.authDomain}`,
			handleCodeInApp: true,
		};
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		await sendEmailVerification(userCredential.user, actionCodeSettings);
		return userCredential;
	} catch (error) {
		throw new Error(error);
	}
};
