function checkAuth(req, res, next) {
	console.log(req.user)
	if (req.user) {
		console.log('user logged');
		res.sendStatus(200);
	} else {
		console.log('no logged user');
		res.sendStatus(401);
	}
}

module.exports = checkAuth;
