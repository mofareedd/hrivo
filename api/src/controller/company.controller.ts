import { STATUS } from "@/constant/status";
import type {
	CreateCompanyInput,
	CreateDepartmentInput,
	GetCompanyByIdInput,
} from "@/schema/company.schema";
import {
	createCompany,
	createDepartment,
	deleteCompany,
	getAllCompanies,
	getAllDepartments,
	getCompanyById,
} from "@/service/company.service";
import { catchAsync } from "@/utils/catchAsync";
import type { Request } from "express";

export const getAllCompaniesHandler = catchAsync(async (req, res, next) => {
	const companies = await getAllCompanies();
	res.status(STATUS.OK).json(companies);
});

export const createCompanyHandler = catchAsync(
	async (req: Request<unknown, unknown, CreateCompanyInput>, res, next) => {
		const accessToken = req.cookies.accessToken as string;

		const company = await createCompany({
			input: req.body,
			token: accessToken,
		});

		res.status(STATUS.OK).json(company);
	},
);

export const getCompanyByIdHandler = catchAsync(
	async (req: Request<GetCompanyByIdInput>, res, next) => {
		const company = await getCompanyById(req.params.companyId);

		res.status(STATUS.OK).json(company);
	},
);

export const deleteCompanyHandler = catchAsync(
	async (req: Request<GetCompanyByIdInput>, res, next) => {
		await deleteCompany(req.params.companyId);

		res.status(STATUS.OK).json({ message: "Company deleted successfully" });
	},
);

//  ========== department controller ==============

export const getAllDepartmentsHandler = catchAsync(
	async (req: Request<CreateDepartmentInput["params"]>, res, next) => {
		const departments = await getAllDepartments({
			input: req.params.companyId,
		});
		res.status(STATUS.OK).json(departments);
	},
);

export const createDepartmentHandler = catchAsync(
	async (
		req: Request<
			CreateDepartmentInput["params"],
			unknown,
			CreateDepartmentInput["body"]
		>,
		res,
		next,
	) => {
		const accessToken = req.cookies.accessToken as string;

		const department = await createDepartment({
			input: {
				...req.body,
				company_id: req.params.companyId,
			},
			token: accessToken,
		});

		res.status(STATUS.OK).json(department);
	},
);

// export const getDepartmentByIdHandler = catchAsync(
// 	async (req: Request<GetDepartmentByIdInput>, res, next) => {
// 		const Department = await getDepartmentById(req.params.DepartmentId);

// 		res.status(STATUS.OK).json(Department);
// 	},
// );

// export const deleteDepartmentHandler = catchAsync(
// 	async (req: Request<GetDepartmentByIdInput>, res, next) => {
// 		await deleteDepartment(req.params.DepartmentId);

// 		res.status(STATUS.OK).json({ message: "Company deleted successfully" });
// 	},
// );
