import { env } from "@/config/env";
import type { CookieOptions, Response } from "express";
import { FIFTEEN_MINUTE, THIRTY_DAYS } from "./date";

type ISetCookies = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};

const defaultCookiesOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
};
export const refreshTokenOptions = (): CookieOptions => ({
	...defaultCookiesOptions,
	expires: THIRTY_DAYS,
	path: env.REFRESH_PATH,
});

export const accessTokenOptions = (): CookieOptions => ({
	...defaultCookiesOptions,
	expires: FIFTEEN_MINUTE,
});
export function setCookies({ res, accessToken, refreshToken }: ISetCookies) {
	res
		.cookie("accessToken", accessToken, {
			...accessTokenOptions(),
		})
		.cookie("refreshToken", refreshToken, { ...refreshTokenOptions() });
}

export function clearCookies(res: Response) {
	res.clearCookie("accessToken").clearCookie("refreshToken", {
		path: env.REFRESH_PATH,
	});
}
