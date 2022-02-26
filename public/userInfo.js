export const getUser = async () => {
	try {
		const res = await fetch("http://localhost:3000/user/info/world", {
			credentials: "include",
		});
		console.log(res);
		console.log(await res.json());
	} catch (error) {
		console.error(error);
	}
};
