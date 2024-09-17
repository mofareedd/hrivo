FROM node:20-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

#  development stage
FROM base as development

RUN pnpm install

COPY . .

RUN pnpm build

CMD ["pnpm", "dev"]
# production stage
FROM base as production

RUN pnpm install --prod

COPY --from=development /app/dist ./dist

CMD ["node", "dist/index.js"]
