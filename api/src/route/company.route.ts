import {
	createCompanyHandler,
	createDepartmentHandler,
	deleteCompanyHandler,
	getAllCompaniesHandler,
	getAllDepartmentsHandler,
	getCompanyByIdHandler,
} from "@/controller/company.controller";
import { protectedRoute, restrictRoute } from "@/middleware/protected";
import { schemaValidator } from "@/middleware/validator";
import {
	createCompanySchema,
	createDepartmentSchema,
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
		schemaValidator(getCompanyByIdSchema),
		getCompanyByIdHandler,
	)
	.delete(protectedRoute, restrictRoute(["super_admin"]), deleteCompanyHandler);

//  ========== department routes ==============

companyRoute.route("/:companyId/department").get(getAllDepartmentsHandler);
// .post(
// 	protectedRoute,
// 	schemaValidator(createDepartmentSchema),
// 	createDepartmentHandler,
// );

export { companyRoute };
