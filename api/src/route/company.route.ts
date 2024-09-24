import {
	createCompanyHandler,
	deleteCompanyHandler,
	getAllCompaniesHandler,
	getCompanyByIdHandler,
} from "@/controller/company.controller";
import { protectedRoute, restrictRoute } from "@/middleware/protected";
import { schemaValidator } from "@/middleware/validator";
import {
	createCompanySchema,
	getCompanyByIdSchema,
} from "@/schema/company.schema";
import { Router } from "express";

const companyRoute = Router();

companyRoute
	.route("/")
	.get(
		protectedRoute,
		restrictRoute(["super_admin", "admin"]),
		getAllCompaniesHandler,
	)
	.post(
		protectedRoute,
		restrictRoute(["super_admin", "admin"]),
		schemaValidator(createCompanySchema),
		createCompanyHandler,
	);

companyRoute
	.route("/:companyId")
	.get(
		protectedRoute,
		restrictRoute(["super_admin", "admin"]),
		schemaValidator(getCompanyByIdSchema),
		getCompanyByIdHandler,
	)
	.delete(protectedRoute, restrictRoute(["super_admin"]), deleteCompanyHandler);

export { companyRoute };
