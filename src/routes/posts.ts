import express, { Request, Response } from 'express'
import path from 'path'
import multer from 'multer'
import { validatePost } from '../middlewares/validatePost'
import { getPostController } from '../controllers/getPost'
import { storePostController } from '../controllers/storePost'
import { newPostController } from '../controllers/newPost'
import { authMiddleware } from '../middlewares/auth'

const storage = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, path.resolve(__dirname, '../public/img'))
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({ storage })

const router = express.Router()
router.use('/store', authMiddleware, upload.single('image'), validatePost)
router.use('/new', authMiddleware)

/*
 * Because filename is posts, we can ommit /posts/ in the link,
 * so /posts/:id will become /:id
 */

router.get('/new', newPostController)

router.post('/store', storePostController)

router.get('/:id', getPostController)

export default router
