import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import { register } from "./firebase.js";
import { router } from "./session.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
app.use(cookieParser());
app.use(csrf({ cookie: { httpOnly: true, sameSite: "none", secure: true } }));

app.get("/csrf-token", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("csrf-token", csrfToken, {
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});
	res.send(csrfToken);
});

app.get("/", async (req, res) => {
	res.send("Hello World!");
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

app.use(router);
app.use(userInfoRouter);

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
