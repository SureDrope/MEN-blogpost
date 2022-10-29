import { BlogPost } from '../models/Blogpost'
import { Request, Response } from 'express'
export const homeController = async (req: Request, res: Response) => {
	const blogposts = await BlogPost.find({}).populate('userId', {
		username: 1
	})
	// console.log(blogposts);
	res.render('index', { blogposts })
}
