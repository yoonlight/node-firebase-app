import express from "express";
import { login, register } from "./firebase.js";
import { getUserInfo, updateUserInfo, createUserInfo } from "./userInfo.js";

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.get("/user/info/:userId", async (req, res) => {
	try {
		const user = await getUserInfo();
		res.json(user.data());
	} catch (error) {
		res.send(error);
	}
});

app.post("/user/info", async (req, res) => {
	try {
		await createUserInfo();
		res.send("Success");
	} catch (error) {
		res.send(error);
	}
});

app.put("/user/info/:userId", async (req, res) => {
	try {
		await updateUserInfo();
		res.send("Success");
	} catch (error) {
		res.send(error);
	}
});

app.post("/user/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await register(email, password);
		res.json(user);
	} catch (error) {
		res.send(error.message);
	}
});

app.post("/user/login", async (req,res)=> {
	try {
		const { email, password } = req.body;
		const user = await login(email, password);
		res.json(user)
	} catch (error) {
		res.send(error.message)
	}
})

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
