import { env } from "@/config/env";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
function verifyToken() {}

export function signJwt(
	payload: JwtPayload,
	keyName: "accessToken" | "refreshToken",
	options?: SignOptions,
) {
	const secret =
		keyName === "refreshToken" ? env.JWT_REFRESH_SECRET : env.JWT_SECRET;
	return jwt.sign(payload, secret, {
		audience: ["auth"],
		...options,
	});
}
