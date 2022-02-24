import {
	getFirestore,
	setDoc,
	getDoc,
	doc,
	collection,
	addDoc,
} from "firebase/firestore";

const db = getFirestore();

export const getUserInfo = async () => {
	try {
		const user = await getDoc(doc(db, "users", "L8GXvahbmW7tk4vYsOdj"));
		return user;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const updateUserInfo = async () => {
	try {
		await setDoc(doc(db, "users", "L8GXvahbmW7tk4vYsOdj"), {
			age: 26,
			height: 171,
			name: "USA",
			sex: "USA",
			weight: 60,
		});
	} catch (error) {
		throw new Error(error);
	}
};

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
