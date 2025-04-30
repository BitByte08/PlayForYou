# 1단계: 빌드
FROM node:18-alpine AS builder
WORKDIR /app
# 1단계: 빌드
COPY package*.json ./
RUN npm install

COPY . .

# 2단계: 실행
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start"]