FROM node:18-slim AS builder

WORKDIR /app

COPY package.json .

RUN npm i -f

COPY . .

ENV BASE_URL="https://wificombat-staging-backend-production.up.railway.app"
ENV NEXT_PUBLIC_BASE_URL="https://wificombat-staging-backend-production.up.railway.app"
ENV NEXT_PUBLIC_BASE_URL_1="https://wificombat-staging-backend-production.up.railway.app"
ENV NEXT_PUBLIC_BASE_URL_2="https://wificombat-staging-backend-production.up.railway.app"
ENV NEXT_PUBLIC_BASE_URL_3="https://wificombat-staging-backend-production.up.railway.app"
ENV NEXT_PUBLIC_BASE_URL_4="https://wificombat-staging-backend-production.up.railway.app"

RUN npm run build

EXPOSE 3000

CMD npm start
