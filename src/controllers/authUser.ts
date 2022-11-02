import passport from 'passport'

export const authUser = () => {
	return passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login'
	})()
}
