const router = require('express').Router();
const { healthCheckHandler } = require('./handlers/healthCheck');

module.exports.configure = (app, config) => {
	const routesPath = config.get('express.routes.path.v1');
	console.info(`Configuring routes : ${routesPath}`);
	app.use(routesPath, router.get(`/health`, healthCheckHandler()));
};
