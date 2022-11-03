import { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'

export const loginUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password } = req.body
	try {
		const user = await User.findOne({ username })
		if (!user) {
			console.log('No user with such username')
			return res.redirect('/auth/login')
		}
		if (await user.comparePasswords(password)) {
			// store user's id in a session
			req.session.userId = `${user._id}`
			console.log(req.session)
			console.log(`Success login of user ${user.username}`)
			return res.redirect('/')
		} else {
			console.log(`Incorrect password for user ${username}`)
			return res.redirect('/auth/login')
		}
	} catch (error) {
		if (error instanceof Error) next(error)
	}
}
