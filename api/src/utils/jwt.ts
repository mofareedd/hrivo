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
		keyName === "refreshToken"
			? env.REFRESH_TOKEN_PRIVATE_KEY
			: env.ACCESS_TOKEN_PRIVATE_KEY;
	return jwt.sign(payload, secret, {
		audience: ["auth"],
		...options,
	});
}

export function verifyToken(
	token: string,
	keyName: "accessToken" | "refreshToken",
	options: VerifyOptions,
) {
	const secret =
		keyName === "refreshToken"
			? env.REFRESH_TOKEN_PUBLIC_KEY
			: env.ACCESS_TOKEN_PUBLIC_KEY;

	try {
		const decoded = jwt.verify(token, secret, options);
		return decoded;
	} catch (e) {
		return null;
	}
}
