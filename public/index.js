import "./firebase.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { getUser } from "./userInfo.js";

const init = async () => {
	try {
		const res = await fetch("http://localhost:3000/csrf-token", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			credentials: "include",
			mode: "cors",
		});
		const csrfToken = await res.text();
		document
			.querySelector('meta[name="csrf-token"]')
			.setAttribute("content", csrfToken);
	} catch (error) {
		console.error(error);
	}
};

init().then();

const loginButton = document.querySelector("button.login");
const logoutButton = document.querySelector("button.logout");
const getUserButton = document.querySelector("button.get_user");

loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
getUserButton.addEventListener("click", getUser);
