FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

RUN rm -rf docker

CMD [ "yarn", "start:prod" ]
