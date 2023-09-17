FROM node:lts-bullseye AS build
ARG BUILD_TAG
LABEL build_tag=${BUILD_TAG}

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /root

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn set version ./.yarn/releases/*
RUN yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"
COPY . .

ARG ENVIRONMENT
RUN yarn build:${ENVIRONMENT}

FROM node:18.17.1-bullseye-slim
ARG ENVIRONMENT
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /root/build/ /app
COPY --chown=node:node --from=build /root/node_modules /app/node_modules
COPY --chown=node:node --from=build /root/.yarn ./.yarn
COPY --chown=node:node --from=build /root/.yarnrc.yml /root/yarn.lock ./
COPY --chown=node:node .env.${ENVIRONMENT} /app/.env

EXPOSE 8080
CMD yarn generate ; dumb-init node ./index.js