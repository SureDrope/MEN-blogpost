import { Request, Response, NextFunction } from 'express'

export const errorCatch = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof Error) {
		// console.error(err.stack)
		// res.status(500).send('Something broke!')
		res.status(500).render('error')
	}
}
