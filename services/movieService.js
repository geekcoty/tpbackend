const Movie = require('../models/Movie');

class MovieService {
	getMovie() {
		const query = Movie.find().exec();
		return query;
	}

	searchMovie(id) {
		const query = Movie.findOne({ _id: id }).exec();
		return query;
	}

	addMovie(data) {
		const newMovie = new Movie(data);
		return newMovie.save();
	}

	updateMovie(id, data) {
		const query = Movie.findOneAndUpdate({ _id: id }, data).exec();
		return query;
	}

	deleteMovie(id) {
		const query = Movie.deleteOne({ _id: id }, function(err) {
			if (err) console.log(err);
			console.log('successful deletion');
		});
		return query;
	}
}

module.exports = MovieService;
