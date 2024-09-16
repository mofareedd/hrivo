import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://hr_owner:JHPhpAi62nWO@ep-quiet-brook-a2ly2lio.eu-central-1.aws.neon.tech/hr?sslmode=require",
  max: 20,
  idleTimeoutMillis: 30000,
});
