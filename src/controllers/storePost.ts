import { BlogPost } from '../models/Blogpost'
import { Request, Response } from 'express'
import path from 'path'

export const storePostController = (req: Request, res: Response) => {
	console.log(req.body, '---', req.file)
	let filePath: string | null = null
	if (req.file) {
		filePath = path.resolve(__dirname, '../public/img', req.file.filename)
	}
	BlogPost.create(
		{
			...req.body,
			image: filePath,
			userId: req.session.userId
		},
		(error: any, blogpost: unknown) => {
			if (error) {
				const validationErrors = Object.keys(error.errors).map(
					(key: string) => error.errors[key].properties.message
				)
				req.flash('data', req.body)
				// req.flash('imagePath', filePath)
				req.flash('validationErrors', validationErrors)
			}
		}
	)
	res.redirect('/')
}
