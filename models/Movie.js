const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	media: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Movie', movieSchema);
