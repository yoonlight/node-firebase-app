import express from "express";
import "./loaders/admin.js"
import "./loaders/firebase.js"
import { loadMiddleware } from "./loaders/express.js";
import { loadSwagger } from "./loaders/swagger.js";
import { authRouter } from "./router/auth.js";
import { router } from "./router/session.js";
import { userInfoRouter } from "./router/userInfo.js";

const app = express();
const PORT = 3000;

loadMiddleware(app);
loadSwagger(app);

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.use(authRouter);
app.use(router);
app.use(userInfoRouter);

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
