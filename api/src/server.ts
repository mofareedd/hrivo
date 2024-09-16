import "dotenv/config";

import { app } from "./index";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const PORT = env.PORT;

async function initializeApp() {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

initializeApp();
