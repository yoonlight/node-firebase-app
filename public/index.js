import "./firebase.js";
import { isLogin, login } from "./login.js";
import { logout } from "./logout.js";
import { editUser, getUser } from "./userInfo.js";

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
const editUserButton = document.querySelector("button.edit_user");

if (isLogin()) {
	loginButton.style.display = "none";
	logoutButton.style.display = "block";
} else {
	loginButton.style.display = "block";
	logoutButton.style.display = "none";
}

loginButton.addEventListener("click", async () => {
	try {
		const email = document.querySelector("#email").value;
		const pass = document.querySelector("#pass").value;
		await login(email, pass);
		loginButton.style.display = "none";
		logoutButton.style.display = "block";
		alert("success to login");
		// form 초기화 필요
	} catch (error) {
		alert("fail to login");
	}
});

logoutButton.addEventListener("click", async (event) => {
	event.preventDefault();
	await logout();
	logoutButton.style.display = "none";
	loginButton.style.display = "block";
	alert("success to logout");
});

getUserButton.addEventListener("click", getUser);

editUserButton.addEventListener("click", async () => {
	const userForm = document.forms.namedItem("userForm");
	const data = {
		sex: userForm["sex"].value,
		name: userForm["name"].value,
		weight: userForm["weight"].value,
		height: userForm["height"].value,
		age: userForm["age"].value,
	};
	await editUser(data);
});
