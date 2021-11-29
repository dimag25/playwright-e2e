# build environment
FROM node:14
FROM mcr.microsoft.com/playwright:focal
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
COPY data/ /app/data/
COPY src/ /app/src/
COPY playwright.config.ts /app/
COPY global-teardown.ts /app/
COPY allure-results/ /app/allure-results/
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN npm install
Run npm run test
Run npx allure generate ./allure-results --clean
Run npx allure open ./allure-report
