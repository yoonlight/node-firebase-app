import express from "express";
import { createUserInfo, login, register } from "./firebase.js";

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.post("/user/info", async (req, res) => {
	try {
		await createUserInfo();
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
