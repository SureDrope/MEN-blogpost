import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User, IUser } from '../models/User'

// interface IUser {
// 	_Id: string
// }

export const loginUserController = (req: Request, res: Response) => {
	const { username, password } = req.body
	User.findOne({ username }, (error: Error, user: IUser) => {
		if (user) {
			bcrypt.compare(password, user.password, (error, same) => {
				if (same) {
					// store user session
					// console.log(user._id)
					req.session.userId = `${user._id}`
					console.log(req.session)
					console.log(`Success login of user ${user.username}`)
					res.redirect('/')
				} else {
					console.log(`Wrong password for user ${user.username}`)
					res.redirect('/auth/login')
				}
			})
		} else {
			console.log('User not found')
			res.redirect('/auth/login')
		}
	})
}
