import "dotenv/config";

import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`);
});

function onCloseSignal() {
	logger.info("Termination signal received. Initiating shutdown...");
	server.close(() => {
		logger.info("Server successfully closed. Exiting process.");
		process.exit();
	});

	setTimeout(() => {
		logger.error("Forcing shutdown after 10 seconds timeout.");
		process.exit(1);
	}, 10000).unref();
}
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
