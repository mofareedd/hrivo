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
	ACCESS_TOKEN_PUBLIC_KEY: getEnv("ACCESS_TOKEN_PUBLIC_KEY"),
	ACCESS_TOKEN_PRIVATE_KEY: getEnv("ACCESS_TOKEN_PRIVATE_KEY"),
	REFRESH_TOKEN_PUBLIC_KEY: getEnv("REFRESH_TOKEN_PUBLIC_KEY"),
	REFRESH_TOKEN_PRIVATE_KEY: getEnv("REFRESH_TOKEN_PRIVATE_KEY"),
	RESEND_KEY: getEnv("RESEND_KEY"),
};

export { env };
