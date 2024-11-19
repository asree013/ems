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

# ตั้งค่าตัวแปรใน Dockerfile
ARG NEXT_PUBLIC_KEY_VALUE
ENV NEXT_PUBLIC_KEY_VALUE=$NEXT_PUBLIC_KEY_VALUE
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
