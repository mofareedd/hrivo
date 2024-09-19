import { db } from "@/config/db";
import { env } from "@/config/env";
import { STATUS } from "@/constant/status";
import type { SignupInput } from "@/schema/user.schema";
import { HttpException } from "@/utils/exception";
import { signJwt } from "@/utils/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signupUser({
	user,
	userAgent,
}: { user: SignupInput; userAgent?: string }) {
	const isUserExisit = await db
		.selectFrom("users")
		.select(["email", "username"])
		.where("email", "=", user.email)
		.executeTakeFirst();

	if (isUserExisit) {
		throw new HttpException("User is already exisit", STATUS.CONFLICT);
	}

	const hashPass = await bcrypt.hash(user.password, 10);

	const newUser = await db
		.insertInto("users")
		.values({ ...user, password: hashPass })
		.returningAll()
		.executeTakeFirst();

	if (!newUser) {
		throw new HttpException(
			"Ops! Failed to register user, Please try again later!",
			STATUS.BAD_REQUEST,
		);
	}

	const session = await db
		.insertInto("sessions")
		.values({ user_id: newUser.id, user_agent: userAgent })
		.returning("id")
		.executeTakeFirst();

	if (!session) {
		throw new HttpException(
			"Ops! Failed to create a session, Please try again later!",
			STATUS.BAD_REQUEST,
		);
	}

	const refreshToken = signJwt({ id: session.id }, "refreshToken", {
		expiresIn: "30d",
	});

	const accessToken = signJwt(
		{ userId: newUser.id, sessionId: session.id },
		"accessToken",
		{
			expiresIn: "15m",
		},
	);

	const { password, ...userInfo } = newUser;

	return { userInfo, accessToken, refreshToken };
}
