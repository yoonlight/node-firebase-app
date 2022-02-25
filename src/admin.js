import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

admin.initializeApp({
	credential: applicationDefault(),
});

export const checkIsLogin = async (req, res, next) => {
	try {
		const token = req.header("token")
        if (!token) throw new Error("로그인이 필요합니다.")
		const decodedToken = await getAuth().verifyIdToken(token, true);
		const result = await getAuth().getUser(decodedToken.uid);
        if (!result) throw new Error("등록된 아이디가 아닙니다.")
        const isExpired = new Date(decodedToken.exp * 1000) < new Date();
        if (isExpired) throw new Error("토큰이 만료되었습니다.")
		next();
	} catch (error) {
		res.status(500).send(error.message);
	}
};
