FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.* ./
COPY .npmrc .npmrc


RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
