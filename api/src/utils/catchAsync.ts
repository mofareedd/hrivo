import type { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = <
	P = unknown, // Params type
	ResBody = unknown, // Response body type
	ReqBody = unknown, // Request body type
	ReqQuery = unknown, // Request query type
>(
	fn: RequestHandler<P, ResBody, ReqBody, ReqQuery>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

// export const catchAsync =
// 	(fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
// 		Promise.resolve(fn(req, res, next)).catch((e) => next(e));
// 	};
