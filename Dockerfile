FROM node:lts-bullseye AS build
ARG BUILD_TAG
LABEL build_tag=${BUILD_TAG}

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /root

COPY package.json yarn.lock ./
RUN yarn install --ignore-optional --production
COPY . .

ARG ENVIRONMENT
RUN yarn build:${ENVIRONMENT}

FROM node:16.18.0-bullseye-slim
ARG ENVIRONMENT
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /root/build/ /app
COPY --chown=node:node --from=build /root/node_modules /app/node_modules
COPY --chown=node:node .env.${ENVIRONMENT} /app/.env

EXPOSE 8080
CMD yarn generate ; dumb-init node ./index.js