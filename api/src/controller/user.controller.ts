import { db } from "@/config/db";
import { catchAsync } from "@/utils/catchAsync";

export const signupHandler = catchAsync(async (req, res, next) => {
	const users = await db.selectFrom("users").selectAll().execute();

	res.status(200).json(users);
});
