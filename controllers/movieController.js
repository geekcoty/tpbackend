class MovieController {
	constructor(movieService) {
		this.movieService = movieService;
		this.movies = [];
	}

	async getMovie(req, res) {
		const movies = await this.movieService.getMovie();
		res.json(movies);
	}

	async searchMovie(req, res) {
		const { id } = req.params;
		if (id) {
			try {
				const movie = await this.movieService.searchMovie(id);
				return res.send(200).status(movie);
			} catch (error) {
				console.log(error);
				return res.sendStatus(400);
			}
		} else {
			return res.sendStatus(404);
		}
	}

	async addMovie(req, res) {
		const newMovie = req.body;
		if (newMovie) {
			try {
				const newEntry = await this.movieService.addMovie(newMovie);
				this.movies.push(newEntry);
			} catch (error) {
				res.sendStatus(404);
			}
		} else {
			!newMovie ? res.sendStatus(400) : res.sendStatus(404);
		}
	}

	async updateMovie(req, res) {
		const { id } = req.params;
		const data = req.body;

		if (id && data) {
			try {
				const update = await this.movieService.updateMovie(id, data);
				console.log(update);
				return res.sendStatus(200);
			} catch (error) {
				console.log(error);
				return res.sendStatus(500);
			}
		} else {
			return res.sendStatus(404);
		}
	}

	async deleteMovie(req, res) {
		const { id } = req.params;
		if (id) {
			try {
				const deletion = await this.movieService.deleteMovie(id);
				return res.status(200).send('media deleted');
			} catch (error) {
				console.log(error);
			}
		} else {
			return res.status(404).send('media not found');
		}
	}
}

module.exports = MovieController;
