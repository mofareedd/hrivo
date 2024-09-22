import cookieParser from "cookie-parser";
import express from "express";
import { STATUS } from "./constant/status";
import { errorsHandler } from "./controller/errors";
import { companyRoute } from "./route/company.route";
import { usersRoute } from "./route/user.route";
import { HttpException } from "./utils/exception";
const app = express();
app.use(express.json());
app.use(cookieParser());

// v1 routes
app.use("/v1/auth", usersRoute);
app.use("/v1/company", companyRoute);

// Handle undefined routes
app.all("*", (req, res, next) => {
	next(new HttpException(`${req.originalUrl} not found!`, STATUS.NOT_FOUND));
});

// Global error handler
app.use(errorsHandler);

export { app };
