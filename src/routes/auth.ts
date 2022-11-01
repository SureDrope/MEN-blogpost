import express, { Request, Response } from 'express'
import path from 'path'
import { newUserController } from '../controllers/newUserPage'
// import {}

const router = express.Router()

router.get('/auth/register', newUserController)

export default router
