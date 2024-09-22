import { env } from "@/config/env";
import { STATUS } from "@/constant/status";
import type { HttpException } from "@/utils/exception";
import type { NextFunction, Request, Response } from "express";

function productionError(res: Response, err: HttpException) {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
}

export const errorsHandler = (
	err: HttpException,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	err.statusCode = err.statusCode || STATUS.INTERNAL_SERVER_ERROR;
	err.message = err.message || "Internal Server Error";

	console.log(err);
	if (env.NODE_ENV === "development") {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			stack: err.stack,
		});
	} else {
		productionError(res, err);
	}
};
