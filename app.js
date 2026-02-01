const config = require('config');
const os = require('os');
const pkg = require('./package.json');
const expressConfigurator = require('./src/modules/expressConfigurator');
const httpConfigurator = require('./src/modules/httpConfigurator');

const signalHandler = (signal) => async () => {
	console.warn(`Exiting on signal handler: ${signal}`);
	process.exit(1);
};

process.on('SIGINT', signalHandler('SIGINT'));
process.on('SIGTERM', signalHandler('SIGTERM'));

console.info(`>>> Starting Application ${pkg.name} <<<`);
const HOSTNAME = os.hostname();
	(async function () {
		try {
			const app = expressConfigurator.configure(config);
			httpConfigurator.configure(app, config);
			process.env.HOSTNAME = HOSTNAME;
		} catch (err) {
			console.warn(`Exiting on signal: ${err.message}`);
			console.error(err.message);
			process.exit(1);
		}
	})()