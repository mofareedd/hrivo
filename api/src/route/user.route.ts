import { signupHandler } from "@/controller/user.controller";
import { Router } from "express";

const usersRoute = Router();

usersRoute.route("/").get(signupHandler);

export { usersRoute };
