import { Schema, model } from 'mongoose'

export interface IBlogPost {
	title: string
	body: string
	userId: Schema.Types.ObjectId
	datePosted: Date
	image: string
}

const BlogPostSchema = new Schema<IBlogPost>({
	title: { type: String, required: [true, "Title can't be empty!"] },
	body: { type: String, required: [true, "Body can't be empty!"] },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	datePosted: {
		type: Date,
		default: new Date()
	},
	image: String
})

export const BlogPost = model<IBlogPost>('BlogPost', BlogPostSchema)
