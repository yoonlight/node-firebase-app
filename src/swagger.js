import { dirname, resolve } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerDefinition = {
	info: {
		title: "Firebase",
		version: "1.0.0",
		description: "Firebase User CRUD",
	},
	host: "localhost:3000",
	basePath: "/",
};

const options = {
	swaggerDefinition,
	apis: [
		resolve(__dirname, "index.js"),
		resolve(__dirname, "router/*.js"),
	],
};

export const swaggerSpec = swaggerJSDoc(options);
