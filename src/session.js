import { Router } from "express";
import { getAuth } from "firebase-admin/auth";

export const router = Router();

router.post("/sessionLogin", async (req, res) => {
	try {
		// Get the ID token passed and the CSRF token.
		const idToken = req.body.idToken.toString();
		
		// Set session expiration to 5 days.
		// const expiresIn = 60 * 60 * 24 * 5 * 1000;
		const expiresIn = 60 * 5 * 1000;
		// Create the session cookie. This will also verify the ID token in the process.
		// The session cookie will have the same claims as the ID token.
		// To only allow session cookie setting on recent sign-in, auth_time in ID token
		// can be checked to ensure user was recently signed in before creating a session cookie.
		const sessionCookie = await getAuth().createSessionCookie(idToken, {
			expiresIn,
		});
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			sameSite: "None",
			secure: true,
		};
		res.cookie("session", sessionCookie, options);
		res.end(JSON.stringify({ status: "success" }));
	} catch (error) {
		console.log(error.message);
		res.status(401).send("UNAUTHORIZED REQUEST!");
	}
});

router.post("/sessionLogout", (req, res) => {
	res.clearCookie("session", { sameSite: "none", secure: true });
	res.end("session logout");
});
