FROM node:14
WORKDIR /usr/src/app-ui
COPY package.json ./
COPY .npmrc ./
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "node", "scripts/start.js" ]