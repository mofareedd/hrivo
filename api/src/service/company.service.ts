import { db } from "@/config/db";
import { STATUS } from "@/constant/status";
import type {
	CreateCompanyInput,
	CreateDepartmentInput,
	GetCompanyByIdInput,
} from "@/schema/company.schema";
import { HttpException } from "@/utils/exception";
import { verifyJwt } from "@/utils/jwt";

export async function getAllCompanies() {
	const companies = await db.selectFrom("companies").selectAll().execute();

	return companies;
}

export async function createCompany({
	input,
	token,
}: { input: CreateCompanyInput; token: string }) {
	const decodedToken = verifyJwt(token, "accessToken");

	if (!decodedToken) {
		throw new HttpException("You are not authorized", STATUS.UNAUTHORIZED);
	}

	return await db
		.insertInto("companies")
		.values({ ...input, created_by: decodedToken.userId })
		.execute();
}

export async function getCompanyById(companyId: string) {
	const company =
		(await db
			.selectFrom("companies")
			.selectAll()
			.where("id", "=", companyId)
			.executeTakeFirst()) ?? null;

	console.log(company);
	if (!company) {
		throw new HttpException("Company not found", STATUS.NOT_FOUND);
	}

	return company;
}

export async function deleteCompany(companyId: string) {
	const company =
		(await db
			.deleteFrom("companies")
			.where("id", "=", companyId)
			.returningAll()
			.executeTakeFirst()) ?? null;

	if (!company) {
		throw new HttpException("Company not found", STATUS.NOT_FOUND);
	}

	return company;
}

//  ========== department business logic ==============

export async function getAllDepartments({ input }: { input: string }) {
	return await db.selectFrom("departments").selectAll().execute();
}

type ExtendedCreateDepartmentInputBody = CreateDepartmentInput["body"] & {
	company_id: string;
};
export async function createDepartment({
	input,
	token,
}: { input: ExtendedCreateDepartmentInputBody; token: string }) {
	const decodedToken = verifyJwt(token, "accessToken");

	if (!decodedToken) {
		throw new HttpException("You are not authorized", STATUS.UNAUTHORIZED);
	}

	return await db
		.insertInto("departments")
		.values({ ...input })
		.execute();
}

// export async function getCompanyById(companyId: string) {
// 	const company =
// 		(await db
// 			.selectFrom("companies")
// 			.selectAll()
// 			.where("id", "=", companyId)
// 			.executeTakeFirst()) ?? null;

// 	console.log(company);
// 	if (!company) {
// 		throw new HttpException("Company not found", STATUS.NOT_FOUND);
// 	}

// 	return company;
// }

// export async function deleteCompany(companyId: string) {
// 	const company =
// 		(await db
// 			.deleteFrom("companies")
// 			.where("id", "=", companyId)
// 			.returningAll()
// 			.executeTakeFirst()) ?? null;

// 	if (!company) {
// 		throw new HttpException("Company not found", STATUS.NOT_FOUND);
// 	}

// 	return company;
// }
