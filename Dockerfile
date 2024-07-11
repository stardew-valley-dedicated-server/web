FROM node:20-alpine

WORKDIR /app

RUN apk update && \
  apk upgrade && \
  apk add git

COPY asyncapi.yaml package*.json /app/
COPY scripts /app/scripts/
COPY sub_modules /app/sub_modules/

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 24678
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
