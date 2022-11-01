import { NextFunction, Request, Response } from 'express'
import { User, IUser } from '../models/User'

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!(req.session && req.session.userId)) return res.redirect('/auth/login')
	next()
}
