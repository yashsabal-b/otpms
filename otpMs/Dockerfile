FROM node:9-slim
WORKDIR /app
COPY package.json ./app
RUN npm i
COPY . ./app
CMD ["npm", "start"]