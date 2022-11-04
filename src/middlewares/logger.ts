import { Request, Response } from 'express'
export const logger = (req: Request, res: Response, next: Function) => {
	// console.log(`Entering ${req.originalUrl}`)
	console.log(req.session)
	console.log(req.flash)

	// console.log(`Entering ${req.url}`)
	// console.log(req.session?.id)

	next()
}
