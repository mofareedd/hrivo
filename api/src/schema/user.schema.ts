import { z } from "zod";

export const signupSchema = z.object({
	body: z.object({
		username: z.string({ required_error: "username field is required." }),
		password: z
			.string({ required_error: "password field is required." })
			.min(6),
		first_name: z.string({ required_error: "first_name field is required." }),
		last_name: z.string({ required_error: "last_name field is required." }),
		email: z
			.string({ required_error: "email field is required." })
			.email("Invalid Email"),
		phone_number: z.string().optional(),
		role: z.enum(["super_admin", "admin"], {
			required_error: "role field is required",
		}),
		userAgent: z.string().optional(),
		status: z.enum(["active", "inactive"]).optional().default("inactive"),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		username: z.string({ required_error: "username field is required." }),
		password: z
			.string({ required_error: "password field is required." })
			.min(6),
		userAgent: z.string().optional(),
	}),
});

export const verifyEmailSchema = z.object({
	params: z.object({
		code: z.string().min(16, "Invalid Code"),
	}),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type VerifyEmailParams = z.infer<typeof verifyEmailSchema>["params"];
