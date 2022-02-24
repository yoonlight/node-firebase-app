import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";

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
