import { STATUS } from "@/constant/status";
import type {
	LoginInput,
	SignupInput,
	VerifyEmailParams,
} from "@/schema/user.schema";
import {
	loginUser,
	logout,
	signupUser,
	verifyEmail,
} from "@/service/user.service";
import { catchAsync } from "@/utils/catchAsync";
import { clearCookies, setCookies } from "@/utils/cookies";
import type { Request } from "express";

export const signupHandler = catchAsync(
	async (req: Request<unknown, unknown, SignupInput>, res, next) => {
		// Call signupUser service to create a new user
		const { accessToken, refreshToken, userInfo } = await signupUser({
			user: req.body,
			userAgent: req.headers["user-agent"],
		});

		// Set access and refresh tokens as cookies
		setCookies({ res, accessToken, refreshToken });

		// Send user info as response
		res.status(STATUS.OK).json(userInfo);
	},
);

export const verifyEmailHandler = catchAsync(
	async (req: Request<VerifyEmailParams>, res, next) => {
		// Call verifyEmail service to verify the user's email
		await verifyEmail({ code: req.params.code });

		// Send success message as response
		res.status(STATUS.OK).json({ message: "Email was successfully verified" });
	},
);

export const loginHandler = catchAsync(
	async (req: Request<unknown, unknown, LoginInput>, res, next) => {
		// Call loginUser service to authenticate the user
		const { accessToken, refreshToken, userInfo } = await loginUser({
			user: req.body,
			userAgent: req.headers["user-agent"],
		});

		// Set access and refresh tokens as cookies
		setCookies({ res, accessToken, refreshToken });

		// Send user info as response
		res.status(STATUS.OK).json(userInfo);
	},
);

export const logoutHandler = catchAsync(async (req, res, next) => {
	// Get access token from cookies
	const accessToken = (req.cookies.accessToken as string) || undefined;
	// If no access token, return unauthorized error
	if (!accessToken) {
		return res
			.status(STATUS.UNAUTHORIZED)
			.json({ message: "You are not authorized" });
	}

	// Call logout service to invalidate the session
	await logout({ token: accessToken });

	// Clear cookies
	clearCookies(res);

	// Send success message as response
	res.status(STATUS.OK).json({ message: "Logout successfully" });
});
