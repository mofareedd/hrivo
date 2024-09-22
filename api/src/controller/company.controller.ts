import { STATUS } from "@/constant/status";
import type {
	CreateCompanyInput,
	GetCompanyByIdInput,
} from "@/schema/company.schema";
import {
	createCompany,
	getAllCompanies,
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
