import {
	loginHandler,
	logoutHandler,
	refreshHandler,
	signupHandler,
	verifyEmailHandler,
} from "@/controller/user.controller";
import { protectedRoute } from "@/middleware/protected";
import { schemaValidator } from "@/middleware/validator";
import {
	loginSchema,
	signupSchema,
	verifyEmailSchema,
} from "@/schema/user.schema";
import { Router } from "express";

const usersRoute = Router();

usersRoute.get("/", (req, res) => {
	res.send("Hello");
});
usersRoute.post("/signup", schemaValidator(signupSchema), signupHandler);
usersRoute.post("/login", schemaValidator(loginSchema), loginHandler);
usersRoute.get("/refresh", refreshHandler);
usersRoute.get("/logout", protectedRoute, logoutHandler);
usersRoute.get(
	"/email/verify/:code",
	schemaValidator(verifyEmailSchema),
	verifyEmailHandler,
);

export { usersRoute };
