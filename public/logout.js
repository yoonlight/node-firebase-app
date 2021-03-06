import {
	getAuth,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

const auth = getAuth();

export const logout = async () => {
	try {
		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute("content");

		await fetch("http://localhost:3000/sessionLogout", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"csrf-token": csrfToken,
			},
			credentials: "include",
		});
		await signOut(auth);
	} catch (error) {
		console.error(error);
	}
};
