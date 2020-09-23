FROM node:12
WORKDIR /app
COPY  package.json /app
RUN yarn install
COPY build /app
CMD node server.js