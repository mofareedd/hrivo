import { STATUS } from "@/constant/status";
import type { SignupInput, VerifyEmailParams } from "@/schema/user.schema";
import { signupUser, verifyEmail } from "@/service/user.service";
import { catchAsync } from "@/utils/catchAsync";
import type { Request, RequestHandler } from "express";

export const signupHandler = catchAsync(
	async (req: Request<unknown, unknown, SignupInput>, res, next) => {
		const { accessToken, refreshToken, userInfo } = await signupUser({
			user: req.body,
			userAgent: req.headers["user-agent"],
		});

		res.cookie("accessToken", accessToken).cookie("refreshToken", refreshToken);

		res.status(STATUS.OK).json(userInfo);
	},
);

export const verifyEmailHandler = catchAsync(
	async (req: Request<VerifyEmailParams>, res, next) => {
		await verifyEmail({ code: req.params.code });

		res.status(STATUS.OK).json({ message: "Email was successfully verified" });
	},
);
