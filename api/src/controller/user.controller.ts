import { db } from "@/config/db";
import type { SignupInput } from "@/schema/user.schema";
import { signupUser } from "@/service/user.service";
import { catchAsync } from "@/utils/catchAsync";
import type { Request } from "express";

export const signupHandler = catchAsync(
	async (req: Request<unknown, unknown, SignupInput>, res, next) => {
		console.log(req.body);
		const { accessToken, refreshToken, userInfo } = await signupUser({
			user: req.body,
			userAgent: req.headers["user-agent"],
		});

		res.cookie("accessToken", accessToken).cookie("refreshToken", refreshToken);

		res.status(200).json(userInfo);
	},
);
