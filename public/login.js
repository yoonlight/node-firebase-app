import {
	getAuth,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

const auth = getAuth();

await auth.setPersistence(browserLocalPersistence)

export const login = async (email, pass) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, pass);
		const idToken = await user.user.getIdToken();
		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute("content");
		await fetch("http://localhost:3000/sessionLogin", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"csrf-token": csrfToken,
			},
			body: JSON.stringify({ idToken, _csrf: csrfToken }),
			credentials: "include",
		});
	} catch (error) {
		throw new Error(error)
	}
};

export const isLogin = () => {
	return auth.currentUser
}