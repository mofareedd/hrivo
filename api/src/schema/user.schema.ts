import { z } from "zod";

export const signupSchema = z.object({
	body: z.object({
		username: z.string(),
		password: z.string().min(6),
		first_name: z.string(),
		last_name: z.string(),
		email: z.string().email("Invalid Email"),
		phone_number: z.string().optional(),
		role: z.enum(["super_admin", "admin"]),
		userAgent: z.string().optional(),
		status: z.enum(["active", "inactive"]).optional().default("inactive"),
	}),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
