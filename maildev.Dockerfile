FROM node:18.20.4-alpine

RUN npm i -g maildev@2.0.5

CMD maildev
