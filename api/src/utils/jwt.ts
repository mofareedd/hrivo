import { env } from "@/config/env";
import jwt, {
	type VerifyOptions,
	type JwtPayload,
	type SignOptions,
} from "jsonwebtoken";

export function signJwt(
	payload: JwtPayload,
	keyName: "accessToken" | "refreshToken",
	options?: SignOptions,
) {
	const secret =
		keyName === "refreshToken" ? env.REFRESH_TOKEN_KEY : env.ACCESS_TOKEN_KEY;
	return jwt.sign(payload, secret, {
		audience: ["auth"],
		expiresIn: keyName === "refreshToken" ? "30d" : "15m",
		...options,
	});
}

export function verifyJwt<
	TPayload extends object = { userId: string; sessionId: string },
>(token: string, keyName: "accessToken" | "refreshToken") {
	const secret =
		keyName === "refreshToken" ? env.REFRESH_TOKEN_KEY : env.ACCESS_TOKEN_KEY;

	try {
		const decoded = jwt.verify(token, secret) as TPayload;
		return decoded;
	} catch (e) {
		return null;
	}
}
