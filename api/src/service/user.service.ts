import { db } from "@/config/db";
import { env } from "@/config/env";
import { STATUS } from "@/constant/status";
import type { LoginInput, SignupInput } from "@/schema/user.schema";
import { getVerifyEmailTemplate } from "@/utils/emailTemplate";
import { HttpException } from "@/utils/exception";
import { signJwt, verifyJwt } from "@/utils/jwt";
import { sendingEmail } from "@/utils/sendEmail";
import bcrypt from "bcrypt";

export async function signupUser({
	user,
	userAgent,
}: { user: SignupInput; userAgent?: string }) {
	// Check if the user already exists based on the email.
	const isUserExisit = await db
		.selectFrom("users")
		.select(["email", "username"])
		.where("email", "=", user.email)
		.executeTakeFirst();

	// Throw an exception if the user already exists.
	if (isUserExisit) {
		throw new HttpException("User is already exisit", STATUS.CONFLICT);
	}

	// Hash the user's password before storing it.
	const hashPass = await bcrypt.hash(user.password, 10);

	const newUser = await db
		.insertInto("users")
		.values({ ...user, password: hashPass })
		.returningAll()
		.executeTakeFirst();

	// Throw an exception if the user registration fails.
	if (!newUser) {
		throw new HttpException(
			"Failed to register user, Please try again later!",
			STATUS.BAD_REQUEST,
		);
	}

	// Create a verification code for the user.
	const verification_code = await db
		.insertInto("verifications")
		.values({ verification_type: "verify_email", user_id: newUser.id })
		.returning("id")
		.execute();

	if (!verification_code) {
		throw new HttpException(
			"Failed to send verification, Please try again later!",
			STATUS.BAD_REQUEST,
		);
	}
	// Send a verification email to the user.
	const { error } = await sendingEmail({
		to: newUser.email,
		...getVerifyEmailTemplate(
			`http://localhost:${env.PORT}/v1/auth/email/verify/${verification_code}`,
		),
	});

	if (error) {
		throw new HttpException(
			"Failed to send verification email, Please try again later!",
			STATUS.BAD_REQUEST,
		);
	}

	// Create a session for the newly registered user.
	const session = await db
		.insertInto("sessions")
		.values({ user_id: newUser.id, user_agent: userAgent })
		.returning("id")
		.executeTakeFirst();

	if (!session) {
		throw new HttpException(
			"Failed to create a session, Please try again later!",
			STATUS.INTERNAL_SERVER_ERROR,
		);
	}

	// Generate JWT tokens for the user.
	const refreshToken = signJwt({ id: session.id }, "refreshToken");

	const accessToken = signJwt(
		{ userId: newUser.id, sessionId: session.id },
		"accessToken",
	);

	// Exclude the password from the user info
	const { password, ...userInfo } = newUser;

	return { userInfo, accessToken, refreshToken };
}

export async function verifyEmail({ code }: { code: string }) {
	// Find the verification record in the database
	const verification = await db
		.selectFrom("verifications")
		.select(["id", "user_id"])
		.where("id", "=", code)
		.executeTakeFirst();

	// If no verification record is found, throw an error
	if (!verification) {
		throw new HttpException("Invalid verification code", STATUS.BAD_REQUEST);
	}

	// Update the user's verified status to true
	const user = await db
		.updateTable("users")
		.set({ verified: true })
		.where("id", "=", verification.user_id)
		.returningAll()
		.executeTakeFirst();

	if (!user) {
		throw new HttpException("User is not exisit", STATUS.UNAUTHORIZED);
	}

	// Delete the verification record from the database
	await db
		.deleteFrom("verifications")
		.where("id", "=", verification.id)
		.execute();

	// Exclude the password from the user info
	const { password, ...userInfo } = user;

	return userInfo;
}

export async function loginUser({
	user,
	userAgent,
}: { user: LoginInput; userAgent?: string }) {
	// Check if the user exists in the database
	const isUserExisit = await db
		.selectFrom("users")
		.selectAll()
		.where("username", "=", user.username)
		.executeTakeFirst();

	// If user doesn't exist, throw an unauthorized error
	if (!isUserExisit) {
		throw new HttpException("User is not exisit", STATUS.UNAUTHORIZED);
	}

	// Compare the provided password with the stored hashed password
	const comparePass = await bcrypt.compare(
		user.password,
		isUserExisit.password,
	);

	// If passwords don't match, throw an unauthorized error
	if (!comparePass) {
		throw new HttpException(
			"Invalid username or password",
			STATUS.UNAUTHORIZED,
		);
	}

	// Create a new session for the user
	const session = await db
		.insertInto("sessions")
		.values({ user_id: isUserExisit.id, user_agent: userAgent })
		.returning("id")
		.executeTakeFirst();

	// If session creation fails, throw a bad request error
	if (!session) {
		throw new HttpException(
			"Failed to create a session, Please try again later!",
			STATUS.INTERNAL_SERVER_ERROR,
		);
	}

	// Generate refresh and access tokens
	const refreshToken = signJwt({ id: session.id }, "refreshToken");
	const accessToken = signJwt(
		{ userId: isUserExisit.id, id: session.id },
		"accessToken",
	);

	// Exclude the password from the user info
	const { password, ...userInfo } = isUserExisit;

	// Return user info and tokens
	return { userInfo, accessToken, refreshToken };
}

export async function logout({ token }: { token: string }) {
	// Verify the access token
	const decoded = verifyJwt(token, "accessToken");
	// If token is invalid, throw an unauthorized error
	if (!decoded) {
		throw new HttpException("You are not authorized", STATUS.UNAUTHORIZED);
	}

	// Delete the user's session from the database
	await db.deleteFrom("sessions").where("id", "=", decoded.userId).execute();

	// Return the decoded token information
	return decoded;
}
