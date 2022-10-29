import { BlogPost } from '../models/Blogpost'
import mongoose from 'mongoose'
import { Request, Response } from 'express'

export const getPostController = async (
	req: Request,
	res: Response,
	next: Function
) => {
	//called when request to /post comes
	try {
		const blogpost = await BlogPost.findById(
			new mongoose.Types.ObjectId(req.params.id.trim())
		).populate('userId', { username: 1 })
		res.render('post', { blogpost })
	} catch (error) {
		if (error instanceof Error) {
			next(error)
		}
	}
}
