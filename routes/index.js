const express = require('express');

const router = express.Router();

const { now } = require('mongoose');
const { response } = require('express');

// Custom Middleware
const checkAdmin = require('./../utils/checkAdmin');
const checkAuth = require('./../utils/checkAuth');
// Passport
const passport = require('passport');
// Multer
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads');
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.png');
	}
});
const upload = multer({ storage: storage });

// Controller e instancias
const MovieController = require('../controllers/movieController');
const MovieService = require('../services/movieService');
const MovieInstance = new MovieController(new MovieService());

const UserController = require('../controllers/userController');
const UserService = require('../services/userService');
const UserInstance = new UserController(new UserService());

/* GET home page. */
router.get('/', function(req, res, next) {
	return res.json('todo ok');
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
	return res.status(200).send('Authorized');
});

router.get('/verify', checkAuth, checkAdmin, function(req, res, next) {
	return res.json(req.user);
});

// Movies
//Muestra un array con todas las películas. Solo se puede acceder autenticado
router.get('/movies', checkAuth, function(req, res, next) {
	MovieInstance.getMovie(req, res);
});

//Muestra la información de una película especīfica. Solo se puede acceder autenticado
router.get('/movies/:id', checkAuth, function(req, res, next) {
	MovieInstance.searchMovie(req, res);
});

//Sirve para crear una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.post('/movies/upload', checkAdmin, upload.single('cover'), function(req, res, next) {
	MovieInstance.addMovie(req, res);
	return res.json({
		file: req.file,
		body: req.body
	});
});

//Sirve para modificar una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.put('/movies/edit/:id', checkAuth, checkAdmin, function(req, res, next) {
	MovieInstance.updateMovie(req, res);
});

// Sirve para borrar una película de la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.delete('/movies/delete/:id', checkAuth, checkAdmin, function(req, res, next) {
	MovieInstance.deleteMovie(req, res);
});

// Users
//Muestra una lista de usuarios, no tiene restricciones de acceso
router.get('/users/', function(req, res, next) {
	UserInstance.getUser(req, res);
});

//Muestra la información de un usuario particular, no tiene restricciones de acceso
router.get('/users/:id', function(req, res, next) {
	UserInstance.searchUser(req, res);
});

//Sirve para crear un usuario en la base de datos, no tiene restricciones de acceso
router.post('/users/', function(req, res, next) {
	UserInstance.addUser(req, res);
});

//Sirve para modificar un usuario en la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.put('/users/edit/:id', checkAuth, checkAdmin, function(req, res, next) {
	UserInstance.updateUser(req, res);
});

// Sirve para borrar un usuario de la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.delete('/users/delete/:id', checkAuth, checkAdmin, function(req, res, next) {
	UserInstance.deleteUser(req, res);
});

module.exports = router;
