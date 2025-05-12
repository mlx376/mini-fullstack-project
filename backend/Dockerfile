FROM node:18

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 5050

CMD ["npm", "run", "dev"]
