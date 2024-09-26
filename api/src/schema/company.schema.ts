import { z } from "zod";

export const createCompanySchema = z.object({
	body: z.object({
		name: z.string({ required_error: "name is required" }),
		logo: z.string({ required_error: "logo is required" }),
		industry: z.string({ required_error: "industry is required" }),
		address: z.string({ required_error: "location is required" }),
		phone_number: z.string({ required_error: "phone number is required" }),
		country: z.string({ required_error: "country is required" }),
	}),
});

export const createDepartmentSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "name is required" }),
		// description: z.string()¿,
		description: z.string().optional(),
	}),
	params: z.object({
		companyId: z
			.string({ required_error: "company id params is missing" })
			.min(16),
	}),
});

export const getCompanyByIdSchema = z.object({
	params: z.object({
		companyId: z.string().min(16),
	}),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>["body"];
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
export type GetCompanyByIdInput = z.infer<
	typeof getCompanyByIdSchema
>["params"];
