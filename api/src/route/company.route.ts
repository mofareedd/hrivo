import { createCompanyHandler } from "@/controller/company.controller";
import { protectedRoute, restrictRoute } from "@/middleware/protected";
import { schemaValidator } from "@/middleware/validator";
import { createCompanySchema } from "@/schema/company.schema";
import { getAllCompanies } from "@/service/company.service";
import { Router } from "express";

const companyRoute = Router();

// companyRoute.use(restrictRoute(["super_admin", "admin"]));
companyRoute
	.route("/")
	.get(protectedRoute, getAllCompanies)
	.post(
		protectedRoute,
		schemaValidator(createCompanySchema),
		createCompanyHandler,
	);

export { companyRoute };
