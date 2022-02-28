export const getUser = async () => {
	try {
		const res = await fetch("http://localhost:3000/user/info/world", {
			credentials: "include",
		});
		const info = await res.json();
		for (const key in info) {
			if (Object.hasOwnProperty.call(info, key)) {
				const element = info[key];
				document.forms["userForm"][key].value = element;
			}
		}
	} catch (error) {
		console.error(error);
	}
};

export const editUser = async (userInfo) => {
	try {
		console.log(userInfo);
		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute("content");
		await fetch("http://localhost:3000/user/info/world", {
			method: "PUT",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"csrf-token": csrfToken,
			},
			credentials: "include",
			body: JSON.stringify(userInfo),
		});
	} catch (error) {
		console.error(error);
	}
};
