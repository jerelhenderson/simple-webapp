'use strict'

const Sequelize = require('sequelize');

class ToDoItem extends Sequelize.model { }

// Initializes a Sequelize instance
const initSequelize = (config) => {
	const sequelize = new Sequelize(config.database, config.user, config.password, {
		host: config.server,
		dialect: 'postgres',
		define: {
			freezeTabName: true,
			timestamps: false
		}
	});

	ToDoItem.init({
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
	},
	{
		sequelize,
		tableName: 'Item'
	});
}

const repository = (config) => {
	const sequelize = initSequelize(config);

	const disconnect = () => {
		sequelize.close();
	};

	// Create task in database
	const createToDoItem = (title, description) => {
		return ToDoItem.create({
			title: title,
			description: description,
			iscomplete: false
			});
	};

	// Update task in database as completed
	const markAsComplete = (id) => {
		return ToDoItem.update(
		{
			iscomplete: true
		},
		{
			where: {
				id: id
			}
		});
	};

	// Find all uncompleted tasks in database
	const getAllIncompleteToDoItems = () => {
		return ToDoItem.findAll({
			where: {
				iscomplete: false
			}
		});
	};

	// Sequelize returns a promise
	return Object.create({
		disconnect,
		createToItem,
		getAllIncompleteToDoItems,
		markAsComplete
	});

	const connect = (connection) => {
		return new Promise((resolve, reject) => {
			if (!connection) {
				reject(new Error("Error connecting to database"));
			}

			resolve(repository(connection));
		});
	}
}

module.exports = Object.assign({}, { connect });



