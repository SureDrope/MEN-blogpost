import { Request, Response } from 'express'
export const newUserController = (req: Request, res: Response) => {
	let username = ''
	// const data: { username: string; password: string } | {} = Object(
	const data: { username: string; password: string } | undefined = Object(
		req.flash('data')[0]
	) // turning into Object because for some reason the types are wrong and
	// console.log(data)
	// if (Object.keys(data).length > 0) username = data.username
	if (data) username = data.username
	res.render('register', {
		errors: req.flash('validationErrors'),
		username
	})
	// res.render('register', { errors: req.session.validationErrors })
}
