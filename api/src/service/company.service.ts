import { db } from "@/config/db";
import { STATUS } from "@/constant/status";
import type {
	CreateCompanyInput,
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
