import 'dotenv/config'
import { cleanEnv, port, str } from 'envalid'
import express from 'express'
import { connect } from 'mongoose'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import path from 'path'
import postsRouter from './routes/posts'
import compression from 'compression'

import { homeController } from './controllers/homePage'
import { newUserController } from './controllers/newUser'
import { storeUserController } from './controllers/storeUser'
import { loginController } from './controllers/login'
import { loginUserController } from './controllers/loginUser'
import { logoutController } from './controllers/logout'

import { logger } from './middlewares/logger'
import { errorCatch } from './middlewares/errorCatch'
import { redirAuthedUser } from './middlewares/redirAuthedUser'

import session from 'express-session'
import flash from 'connect-flash'

const env = cleanEnv(process.env, {
	COOKIE_SESSION_SECRET: str(),
	REDIS_URL: str(),
	MONGODB_URL: str(),
	SERVER_PORT: port({ default: 3000 })
})

connect(env.MONGODB_URL)
	.then(() => {
		console.log('Successful connection to the mongodb')
	})
	.catch(() => {
		console.log("Can't connect to the mongodb")
	})

const redisClient = new Redis(env.REDIS_URL)
redisClient.on('error', console.error)

const RedisStore = connectRedis(session)

const app = express()

app.disable('x-powered-by')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(compression())
app.use(
	session({
		secret: env.COOKIE_SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new RedisStore({ client: redisClient })
	})
)
app.use(flash())
app.use((req, res, next) => {
	// if (req.path.slice(-1) === '/' && req.path.length > 1) {
	console.log(req.path)
	if (req.path.endsWith('/') && req.path.length > 1) {
		const query = req.url.slice(req.path.length)
		console.log(query)
		res.redirect(301, req.path.slice(0, -1) + query)
	} else {
		next()
	}
})
app.use(logger)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
	if (!req.session) {
		return next(new Error('oh no'))
	}
	next()
})
app.use((req, res, next) => {
	res.locals.loggedIn = req.session.userId
	next()
})
//
app.use(errorCatch) // should always be last

// Routers should be at the end
app.use('/posts/', postsRouter)

app.listen(env.SERVER_PORT, () => {
	console.log('Hello world')
})

app.get('/', homeController)

app.get('/auth/register', redirAuthedUser, newUserController)
app.post('/users/register', redirAuthedUser, storeUserController)

app.get('/auth/login', redirAuthedUser, loginController)
app.post('/users/login', redirAuthedUser, loginUserController)

app.get('/auth/logout', logoutController)
// app.get('/about', (req, res) => {
// 	// called when request to /about comes in
// 	// res.sendFile(path.resolve(__dirname,'pages/about.html'))
// 	res.render('about')
// })
// app.get('/contact', (req, res) => {
// 	//called when request to /contact comes
// 	// res.sendFile(path.resolve(__dirname,'pages/contact.html'))
// 	res.render('contact')
// })

app.post('/', (req, res) => {
	res.send(req.body)
})

app.get('/search')
// If the route doesn't exists, this page will be rendered
app.use((req, res) => {
	res.render('notfound')
})
