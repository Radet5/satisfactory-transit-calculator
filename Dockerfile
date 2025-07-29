FROM node:24-alpine

RUN yarn install

EXPOSE 8080

CMD [ "yarn", "dev" ]
