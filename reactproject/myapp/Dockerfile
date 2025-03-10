FROM node:20-alpine3.16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev","--", "--host", "0.0.0.0", "--port", "8000"]