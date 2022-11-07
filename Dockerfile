FROM node:16.17.0-bullseye-slim as Builder
ARG BUILD_TAG
LABEL build_tag=${BUILD_TAG}
WORKDIR /root

# Optional - M1
# RUN apt-get update
# RUN apt-get install -y openssl

COPY package.json yarn.lock ./

RUN yarn install --ignore-optional --production

COPY . .
ARG ENVIRONMENT
RUN yarn build:${ENVIRONMENT}

FROM node:16.17.0-bullseye-slim
ARG ENVIRONMENT
WORKDIR /app
COPY --from=Builder /root/build/ /app
COPY --from=Builder /root/node_modules /app/node_modules
COPY .env.${ENVIRONMENT} /app/.env

EXPOSE 8080
CMD yarn generate ; node ./src/index.js