FROM node:20-alpine

WORKDIR /usr/src/backend

# Copy package files
COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

# Copy source
COPY . .

RUN chmod +x scripts/entrypoint.sh

ENTRYPOINT ["./scripts/entrypoint.sh"]

EXPOSE 3000

CMD ["pnpm", "run", "dev"] 