import express from "express";
import { getUserInfo, updateUserInfo, createUserInfo } from "../userInfo.js";
import { checkIsLogin, cookie } from "../admin.js";
import { cache } from "../utils/cache.js";

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
		const url = `${req.url}/${userId}`;
		let result;
		if (!cache.has(url)) {
			const user = await getUserInfo(userId);
			result = user.data();
			cache.set(url, result);
		} else {
			result = cache.get(url);
		}
		res.json(result);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

/**
 * @swagger
 * /user/info/:userId:
 *   post:
 *     summary: Create new user's information
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
 *         description: Success to create new user's information
 */
userInfoRouter.post("/user/info/:userId", checkIsLogin, async (req, res) => {
	try {
		const { userId } = req.params;
		await createUserInfo(userId, req.body);
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
		const url = `${req.url}/${userId}`;
		await updateUserInfo(userId, req.body);
		if (cache.has(url)) cache.delete(url);
		res.send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
