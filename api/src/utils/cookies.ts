import { env } from "@/config/env";
import dayjs from "dayjs";
import type { Response } from "express";

type ISetCookies = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};

export function setCookies({ res, accessToken, refreshToken }: ISetCookies) {
	const FIFTEEN_MINUTE = dayjs().add(15, "minute").endOf("day").toDate();
	const THIRTY_DAYS = dayjs().add(30, "day").toDate();
	res
		.cookie("accessToken", accessToken, {
			expires: FIFTEEN_MINUTE,
		})
		.cookie("refreshToken", refreshToken, {
			expires: THIRTY_DAYS,
			path: env.REFRESH_PATH,
		});
}

export function clearCookies(res: Response) {
	res.clearCookie("accessToken").clearCookie("refreshToken", {
		path: env.REFRESH_PATH,
	});
}
