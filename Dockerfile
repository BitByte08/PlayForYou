# 1단계: 빌드
FROM node:18-alpine AS builder
WORKDIR /app
# 1단계: 빌드
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "run", "start"]