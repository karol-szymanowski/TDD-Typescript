FROM node:14.9.0-alpine
ENV DIR=/app
WORKDIR $DIR

COPY package.json yarn.lock $DIR/
RUN yarn

COPY . .

RUN yarn build

RUN yarn install --production --ignore-scripts --prefer-offline

CMD ["node", "./dist/index.js"]