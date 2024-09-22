import type { UserRoles } from "@/utils/types";

export declare global {
	namespace Express {
		interface Request {
			sessionId: string;
			userId: string;
			role: UserRoles;
		}
	}
}
