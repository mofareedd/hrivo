import { STATUS } from "@/constant/status";
import { HttpException } from "@/utils/exception";
import { verifyJwt } from "@/utils/jwt";
import { UserRolesEnum } from "@/utils/types";
import type { NextFunction, Request, Response } from "express";

export async function protectedRoute(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const accessToken = req.cookies.accessToken as string | undefined;

	if (!accessToken) {
		return next(
			new HttpException("You are not authorized", STATUS.UNAUTHORIZED),
		);
	}

	const decoded = verifyJwt(accessToken, "accessToken");

	if (!decoded) {
		return next(
			new HttpException("You are not authorized", STATUS.UNAUTHORIZED),
		);
	}

	req.userId = decoded.userId;
	req.sessionId = decoded.sessionId;

	next();
}

export const restrictRoute =
	(role: "super_admin" | "admin" | "user") =>
	(req: Request, res: Response, next: NextFunction) => {
		if (role !== "super_admin") {
			next(new HttpException("You are not authorized", STATUS.UNAUTHORIZED));
		}

		next();
	};
