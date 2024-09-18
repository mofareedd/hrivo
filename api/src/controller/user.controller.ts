import { db } from "@/config/db";
import type { RequestHandler } from "express";

export const signupHandler: RequestHandler = async (req, res, next) => {
	try {
		const users = await db.selectFrom("users").selectAll().execute();

		res.status(200).json(users);
	} catch (e) {
		res.status(500).json({ error: e });
	}
};
