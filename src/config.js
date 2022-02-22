const { env } = process;

export const config = {
	firebase: {
		apiKey: env.FIREBASE_API_KEY,
		authDomain: env.FIREBASE_AUTH_DOMAIN,
		projectId: env.FIREBASE_PROJECT_ID,
	},
};
