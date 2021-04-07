# Stage 1: Building the code
FROM mhart/alpine-node AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install --only=prod


# Stage 2: And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:slim as production

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
