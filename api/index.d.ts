declare global {
	namespace Express {
		interface Request {
			sessionId: string;
			userId: string;
		}
	}
}

export {};
