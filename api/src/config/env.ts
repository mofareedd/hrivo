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
  POSTGRES_HOST: getEnv("POSTGRES_HOST"),
};

export { env };
