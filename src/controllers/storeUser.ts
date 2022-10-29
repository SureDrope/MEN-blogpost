import { User } from '../models/User'
import { Request, Response } from 'express'

export const storeUserController = (req: Request, res: Response) => {
	User.create(req.body, (error: any, user: unknown) => {
		if (error) {
			const validationErrors = Object.keys(error.errors).map(
				(key: string) => error.errors[key].properties.message
			)
			req.flash('data', req.body)
			req.flash('validationErrors', validationErrors)
			// req.session.validationErrors = validationErrors
			return res.redirect('/auth/register')
		}
		res.redirect('/')
	})
}

/**
 * where should res.redirect('/') be, inside of callback or outside of User.create?
 */
