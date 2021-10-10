class UserController {
	constructor(userService) {
		this.userService = userService;
		this.users = [];
	}
	async getUser(req, res) {
		const users = await this.userService.getUser();
		res.send(users);
	}

	async searchUser(req, res) {
		const { id } = req.params;
		if (id) {
			try {
				const user = await this.userService.searchUser(id);
				res.json(user);
			} catch (error) {
				res.status(500).send('invalid id');
			}
		} else {
			res.status(400).send('please, enter a valid id');
		}
	}

	async addUser(req, res) {
		const { body } = req;
		const name = body.name.toLowerCase();
		if (body && body.name && body.password) {
			try {
				const user = await this.userService.addUser({ ...body, name });
				res.status(200).json(user);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(400);
		}
	}

	async updateUser(req, res) {
		const { id } = req.params;
		const newData = req.body;

		if (id && newData != '') {
			try {
				const update = await this.userService.updateUser(id, newData);
				return res.sendStatus(200);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(400);
		}
	}

	async deleteUser(req, res) {
		const { id } = req.params;
		if (id) {
			try {
				await this.userService.deleteUser(id);
				res.status(200).send('deleted');
			} catch (error) {
				console.log(error);
				res.status(500).send('error when deleting');
			}
		} else {
			res.status(400).send('not deleted');
		}
	}
}
//

module.exports = UserController;
