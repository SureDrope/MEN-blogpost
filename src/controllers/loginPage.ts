import { Request, Response } from 'express'
export const loginController = (req: Request, res: Response) => {
	res.render('login')
}
