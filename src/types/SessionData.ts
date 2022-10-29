declare module 'express-session' {
	interface SessionData {
		userId: string
		// validationErrors: string[]
	}
}
