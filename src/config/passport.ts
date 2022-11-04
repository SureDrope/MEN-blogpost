import { Strategy } from 'passport-local'
import passport from 'passport'
import { User } from '../models/User'
import { compare } from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
export const initPassport = () => {
	passport.use(
		new Strategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username })
				if (!user)
					return done(null, false, { message: "User doesn't exist" })
				if (await compare(password, user.password))
					return done(null, user)
				else return done(null, false, { message: 'Password incorrect' })
			} catch (error) {
				return done(error)
			}
		})
	)
	passport.serializeUser((user: any, done) => {
		console.log(user)
		done(null, user.id)
	})
	passport.deserializeUser(async (id, done) => {
		console.log(id)
		try {
			const user = await User.findById(id)
			done(null, user)
		} catch (error) {
			return done(error)
		}
	})
}

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) return next()
	return res.redirect('/auth/login')
}

export const redirAuthenticatedUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) return res.redirect('/')
	return next()
}
