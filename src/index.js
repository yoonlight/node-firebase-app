import express from "express";
import cookieParser from "cookie-parser";
import { checkIsLogin, cookie } from "./admin.js";
import { login, logout, register } from "./firebase.js";
import { getUserInfo, updateUserInfo, createUserInfo } from "./userInfo.js";
import { router } from "./session.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.get("/user/info/:userId", cookie, async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await getUserInfo(userId);
		res.json(user.data());
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/user/info", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.body;
		await createUserInfo(userId);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.put("/user/info/:userId", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.params;
		await updateUserInfo(userId);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/user/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await register(email, password);
		res.json(user);
	} catch (error) {
		res.status(500).status(500).send(error.message);
	}
});

app.post("/user/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await login(email, password);
		if (!user.user.emailVerified)
			throw new Error("이메일 인증을 완료하세요");
		const idToken = await user.user.getIdToken();
		res.json({ idToken, csrfToken: req.cookies._csrf });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.get("/user/logout", async (req, res) => {
	try {
		await logout();
		res.send("success to logout");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.use(router);

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
