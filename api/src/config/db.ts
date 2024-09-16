import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
  connectionString: env.POSTGRES_HOST,
  max: 20,
  idleTimeoutMillis: 30000,
});
