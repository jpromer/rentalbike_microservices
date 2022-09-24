
FROM node:12-alpine3.10

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

ENV NODE_ENV QA
ENV PORT 3003
ENV MONGOBD mongodb+srv://desarrollo:BcilntUmkE4CnMLu@cluster0.ipabhxh.mongodb.net/cykel


EXPOSE 3003

CMD [ "npm", "start" ]