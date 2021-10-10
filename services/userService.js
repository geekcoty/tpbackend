const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
	getUser() {
		const query = User.find().exec();
		return query;
	}

	searchUser(id) {
		const query = User.findOne({ _id: id }).exec();
		return query;
	}

	async addUser(data) {
		try {
			const hash = await bcrypt.hash(data.password, 10);
			data.password = hash;
			const newUser = new User(data);
			return newUser.save();
		} catch (e) {
			console.log(e);
		}
	}

	updateUser(id, data) {
		const user = User.findOneAndUpdate({ _id: id }, data).exec();
		return user;
	}

	deleteUser(id) {
		const query = User.deleteOne({ _id: id }, function(err) {
			if (err) console.log(err);
			console.log('successful deletion');
		});
		return query;
	}
	//passport middleware
	getByName(name) {
		const query = User.findOne({ name }).exec();
		return query;
	}
}

module.exports = UserService;
