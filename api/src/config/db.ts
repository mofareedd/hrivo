import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";
import { Pool } from "pg";
import { env } from "./env";

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: env.DATABASE_URL,
		max: 20,
		idleTimeoutMillis: 30000,
	}),
});

export const db = new Kysely<DB>({
	dialect,
});
