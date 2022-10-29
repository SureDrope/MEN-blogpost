import { NextFunction, Request, Response } from 'express'

export const redirAuthedUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.session.userId) return res.redirect('/')
	next()
}
