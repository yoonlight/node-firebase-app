import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

admin.initializeApp({
	credential: applicationDefault(),
});

export const cookie = async (req, res, next) => {
	try {
		const sessionCookie = req.cookies.session || "";
		// Verify the session cookie. In this case an additional check is added to detect
		// if the user's Firebase session was revoked, user deleted/disabled, etc.
		const decodedToken = await getAuth().verifySessionCookie(
			sessionCookie,
			true /** checkRevoked */
		);
		const result = await getAuth().getUser(decodedToken.uid);
		if (!result) throw new Error("등록된 아이디가 아닙니다.");
		const expTime = new Date(decodedToken.exp * 1000);
		const currentTime = new Date();
		const isExpired = expTime < currentTime;
		if (isExpired) throw new Error("토큰이 만료되었습니다.");
		next();
	} catch (error) {
		console.log(error.message);
		res.status(401).send("UNAUTHORIZED REQUEST!");
	}
};
