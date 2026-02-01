
const app = require('express')();
const cors = require('cors');
const { v6: uuidv6 } = require('uuid');
const routes = require('../routes/index');

const generateUUID = (req, res, next) => {
	req.uuidv6 = uuidv6();
	res.uuidv6 = req.uuidv6;
	next();
};

module.exports.configure = (config) => {
	app.use(cors());
	app.use(generateUUID);
	routes.configure(app, config);
	return app;
};
