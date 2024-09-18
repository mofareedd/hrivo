import express from "express";
import { STATUS } from "./constant/status";
import { errorsHandler } from "./controller/errors";
import { usersRoute } from "./route/user.route";
import { HttpException } from "./utils/exception";

const app = express();

// v1 routes
app.use("/v1/auth", usersRoute);
app.all("*", (req, res, next) => {
	next(new HttpException(`${req.originalUrl} not found!`, STATUS.BAD_REQUEST));
});
app.use(errorsHandler);

export { app };
