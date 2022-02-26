import {
	getAuth,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

const auth = getAuth();

export const login = async () => {
	try {
		const user = await signInWithEmailAndPassword(auth, "email", "pass");
		const idToken = await user.user.getIdToken();
		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute("content");
		console.log(csrfToken);
		const res = await fetch("http://localhost:3000/sessionLogin", {
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
		console.error(error);
	}
};
