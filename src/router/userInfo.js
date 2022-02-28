import express from "express";
import { getUserInfo, updateUserInfo, createUserInfo } from "../userInfo.js";
import { checkIsLogin, cookie } from "../admin.js";

export const userInfoRouter = express.Router();

userInfoRouter.get("/user/info/:userId", cookie, async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await getUserInfo(userId);
		res.json(user.data());
	} catch (error) {
		res.status(500).send(error.message);
	}
});

userInfoRouter.post("/user/info", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.body;
		await createUserInfo(userId);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

userInfoRouter.put("/user/info/:userId", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.params;
		await updateUserInfo(userId);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
