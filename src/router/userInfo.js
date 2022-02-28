import express from "express";
import { getUserInfo, updateUserInfo, createUserInfo } from "../userInfo.js";
import { checkIsLogin, cookie } from "../admin.js";

export const userInfoRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *        name:
 *          type: string
 *        sex:
 *          type: string
 *        age:
 *          type: integer
 *        weight:
 *          type: integer
 *        height:
 *          type: integer
 */

/**
 * @swagger
 * /user/info/:userId:
 *   get:
 *     summary: Get user's information
 *     tags:
 *       - user information
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success to read user's information
 *         schema:
 *           $ref: '#/definitions/User'
 */
userInfoRouter.get("/user/info/:userId", cookie, async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await getUserInfo(userId);
		res.json(user.data());
	} catch (error) {
		res.status(500).send(error.message);
	}
});

/**
 * @swagger
 * /user/info/:
 *   post:
 *     summary: Create new user's information
 *     tags:
 *       - user information
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success to create new user's information
 */
userInfoRouter.post("/user/info", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.body;
		await createUserInfo(userId);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

/**
 * @swagger
 * /user/info/:userId:
 *   put:
 *     summary: Update user's information
 *     tags:
 *       - user information
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success to update existing user's information
 */
userInfoRouter.put("/user/info/:userId", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.params;
		await updateUserInfo(userId);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
