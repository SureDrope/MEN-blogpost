import { NextFunction, Request, Response } from 'express'
import { User, IUser } from '../models/User'

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.session?.userId) {
		User.findById(
			req.session.userId,
			(err: Error | undefined, user: IUser) => {
				if (err || !user) res.redirect('/')
			}
		)
	} else {
		console.log('loh')
	}
	next()
}
