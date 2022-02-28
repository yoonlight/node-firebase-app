import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import morgan from "morgan";

/**
 * Load Express Middleware
 * @param {express.Express} app
 */
export const loadMiddleware = (app) => {
    app.use(express.json());
    app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
    app.use(cookieParser());
    app.use(csrf({ cookie: { httpOnly: true, sameSite: "none", secure: true } }));
    app.use(morgan("tiny"));
}
