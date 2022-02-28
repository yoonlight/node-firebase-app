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
		resolve(__dirname, "../index.js"),
		resolve(__dirname, "../router/*.js"),
	],
};

export const swaggerSpec = swaggerJSDoc(options);

export const loadSwagger = (app) => {
	app.get("/swagger.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	app.get("/docs", (req, res) => {
		res.sendFile(resolve(__dirname, "../../docs/redoc.html"));
	});
}
