FROM node:20.19.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.18-alpine
COPY --from=builder /app/dist/sakai-ng/browser /usr/share/nginx/html
EXPOSE 80
