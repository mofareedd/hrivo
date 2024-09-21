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
	ACCESS_TOKEN_KEY: getEnv("ACCESS_TOKEN_KEY"),
	REFRESH_TOKEN_KEY: getEnv("REFRESH_TOKEN_KEY"),
	REFRESH_PATH: getEnv("REFRESH_PATH"),
	RESEND_KEY: getEnv("RESEND_KEY"),
};

export { env };
