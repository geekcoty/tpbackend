function checkAuth(req, res, next) {
	if (req.user) {
		console.log('user logged');
		res.sendStatus(200);
	} else {
		console.log('no logged user');
		res.sendStatus(401);
	}
}

module.exports = checkAuth;
