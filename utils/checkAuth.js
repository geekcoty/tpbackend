function checkAuth(req, res, next) {
	if (req.user) {
		console.log(req.user, 'logged user');
		next();
	} else {
		console.log('no logged user');
		res.sendStatus(401);
	}
}

module.exports = checkAuth;
