FROM node:20-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /app/
RUN npm ci

#COPY . .

#RUN npm run build

#HMR: "24678:24678"
EXPOSE 24678
EXPOSE 3000

#CMD [ "node", ".output/server/index.mjs" ]
CMD [ "npm", "run", "dev" ]
#COPY docker-entrypoint.sh /startapp.sh
#ENTRYPOINT ["/startapp.sh"]
