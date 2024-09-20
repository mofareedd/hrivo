import express from "express";
import { STATUS } from "./constant/status";
import { errorsHandler } from "./controller/errors";
import { usersRoute } from "./route/user.route";
import { HttpException } from "./utils/exception";

const app = express();
app.use(express.json());

// v1 routes
app.use("/v1/auth", usersRoute);

// Handle undefined routes
app.all("*", (req, res, next) => {
	next(new HttpException(`${req.originalUrl} not found!`, STATUS.NOT_FOUND));
});

// Global error handler
app.use(errorsHandler);

export { app };
