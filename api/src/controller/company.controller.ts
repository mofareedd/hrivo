import { STATUS } from "@/constant/status";
import type { CreateCompanyInput } from "@/schema/company.schema";
import { createCompany, getAllCompanies } from "@/service/company.service";
import { catchAsync } from "@/utils/catchAsync";
import type { Request } from "express";

export const getAllCompaniesHandler = catchAsync(async (req, res, next) => {
	const companies = await getAllCompanies();
	res.status(STATUS.OK).json(companies);
});
export const createCompanyHandler = catchAsync(
	async (req: Request<unknown, unknown, CreateCompanyInput>, res, next) => {
		const accessToken = req.cookies.accessToken as string | undefined;
		if (!accessToken) {
			return res
				.status(STATUS.UNAUTHORIZED)
				.json({ message: "You are not authorized" });
		}
		const company = await createCompany({
			input: req.body,
			token: accessToken,
		});
		res.status(STATUS.OK).json(company);
	},
);
