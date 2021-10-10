const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const userService = require('./services/userService');
const userInstance = new userService();
const bcrypt = require('bcrypt');

//Login
passport.use(
	new localStrategy(
		{
			usernameField: 'name',
			passwordField: 'password'
		},
		async (username, password, cb) => {
			try {
				const userData = await userInstance.getByName(username);
				const compare = await bcrypt.compare(password, userData.password);
				if (compare) {
					return cb(null, userData);
				}
				if (!compare) {
					return cb(null, false);
				}
			} catch (err) {
				console.log(err);
			}
		}
	)
);

passport.serializeUser((user, cb) => {
	cb(null, user.name);
});

passport.deserializeUser(async (name, cb) => {
	const data = await userInstance.getByName(name);

	cb(null, data);
});
