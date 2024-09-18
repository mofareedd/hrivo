import { z } from "zod";

export const signupSchema = z.object({
	body: z.object({}),
});
