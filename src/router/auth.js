import { Router } from "express";
import { register } from "../loaders/firebase.js";

export const authRouter = Router();

authRouter.post("/user/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await register(email, password);
		res.json(user);
	} catch (error) {
		res.status(500).status(500).send(error.message);
	}
});

authRouter.get("/csrf-token", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("csrf-token", csrfToken, {
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});
	res.send(csrfToken);
});
