FROM node:16.17.0-bullseye-slim as Builder
ARG BUILD_TAG
LABEL build_tag=${BUILD_TAG}
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --ignore-optional --production

COPY . .
ARG ENVIRONMENT
RUN yarn build:${ENVIRONMENT}

FROM node:16.17.0-bullseye-slim
WORKDIR /app
COPY --from=Builder /app/build/ /app
COPY --from=Builder /app/node_modules /app/node_modules
COPY .env /app/.env

# Set TimeZone
# RUN apk --update add tzdata
# RUN cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime
# CMD ["cd","/app","yarn","prisma:generate","node","./src/index.js"]

EXPOSE 8080
