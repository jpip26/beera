FROM node:current-alpine AS builder

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

RUN npm prune --production

FROM node:current-alpine AS release

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./
COPY --from=builder /app/moleculer.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/public ./public

EXPOSE 3002

CMD ["npm", "start"]
