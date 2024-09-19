function getEnv(key: string, defaultValue?: string) {
	const value = process.env[key] || defaultValue;

	if (!value) {
		throw new Error(`${key} Environment variables is invalid💥`);
	}

	return value;
}

const env = {
	PORT: getEnv("PORT", "1337"),
	NODE_ENV: getEnv("NODE_ENV", "development"),
	DATABASE_URL: getEnv("DATABASE_URL"),
	JWT_SECRET: getEnv("JWT_SECRET"),
	JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
};

export { env };
