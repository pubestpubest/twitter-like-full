FROM node:20-alpine

WORKDIR /usr/src/backend

# Copy package files
COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

# Copy source
COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"] 