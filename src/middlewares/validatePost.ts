import { Request, Response } from 'express'
export const validatePost = (req: Request, res: Response, next: Function) => {
	if (req.body.title === '') return res.redirect('/posts/new')
	next()
}
