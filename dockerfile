FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --legacy-peer-deps --production \
    && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
