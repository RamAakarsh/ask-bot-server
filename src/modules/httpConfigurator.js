const _ = require('lodash');
const gracefulShutdown = require('http-graceful-shutdown');
const {socketServerConfig} =require('./socketServerConfigurator')
const {connectWithOpenAi} = require('./openAiConfigurator')
const onListening = (port) => {
	console.info(`Server is listening on port ${port}`);
};

module.exports.configure = (app, config) => {
	const port = _.isEmpty(process.env.PORT) ? config.get('http.port') : process.env.PORT;
	const server = app.listen(port, onListening(port));
	socketServerConfig(server)
    connectWithOpenAi();
	gracefulShutdown(server, {
		signals: 'SIGINT SIGTERM',
		timeout: 300000,
		finally: () => {
			console.warn('Server has been gracefully shutted down !');
		}
	});
	return server;
};
