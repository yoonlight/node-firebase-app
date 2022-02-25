import {
	getFirestore,
	updateDoc,
	getDoc,
	doc,
	setDoc,
} from "firebase/firestore";

const db = getFirestore();

const data = {
	age: 26,
	height: 171,
	name: "USA",
	sex: "USA",
	weight: 60,
};

export const getUserInfo = async (userId = "Hello") => {
	try {
		const user = await getDoc(doc(db, "users", userId));
		if (!user.data()) throw new Error("there is no user");
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateUserInfo = async (userId = "L8GXvahbmW7tk4vYsOdj") => {
	try {
		await updateDoc(doc(db, "users", userId), data);
	} catch (error) {
		throw new Error(error);
	}
};

export const createUserInfo = async (userId = "Hello") => {
	try {
		await setDoc(doc(db, "users", userId), data);
	} catch (error) {
		throw new Error(error);
	}
};
