import { Request, Response } from 'express'

export const newPostController = (req: Request, res: Response) => {
	// console.log(req.session)
	if (req.session?.userId) {
		const errors = ''
		res.render('create', { errors, createPost: true })
	} else {
		res.redirect('/auth/login')
	}
}
