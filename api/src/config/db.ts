import type { Database } from "@/constant/types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "./env";

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: env.POSTGRES_HOST,
		max: 20,
		idleTimeoutMillis: 30000,
	}),
});

export const db = new Kysely<Database>({
	dialect,
});
