import {
	getFirestore,
	updateDoc,
	getDoc,
	doc,
	setDoc,
} from "firebase/firestore";

const db = getFirestore();

export const getUserInfo = async (userId) => {
	try {
		const user = await getDoc(doc(db, "users", userId));
		if (!user.data()) throw new Error("there is no user");
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateUserInfo = async (userId, data) => {
	try {
		await updateDoc(doc(db, "users", userId), data);
	} catch (error) {
		throw new Error(error);
	}
};

export const createUserInfo = async (userId, data) => {
	try {
		await setDoc(doc(db, "users", userId), data);
	} catch (error) {
		throw new Error(error);
	}
};
