# สร้างขั้นตอนที่ 1: ติดตั้ง dependencies และสร้าง build
FROM node:18-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# สร้างขั้นตอนที่ 2: สร้าง production image
FROM node:18-slim

WORKDIR /app

# คัดลอกเฉพาะ build ที่สำเร็จแล้วจากขั้นตอน builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# ติดตั้ง dependencies ที่จำเป็นสำหรับ production เท่านั้น
RUN npm install --legacy-peer-deps --production

EXPOSE 3000
CMD [ "npm", "start" ]
