FROM node:14.8.0-alpine3.11 AS build

# install tools and deps for node-gyp
# RUN echo http://mirrors.aliyun.com/alpine/v3.11/main > /etc/apk/repositories \
#   && echo http://mirrors.aliyun.com/alpine/v3.11/main >> /etc/apk/repositories \
#   && apk add --no-cache --virtual .gyp \
#   python \
#   make \
#   g++

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn --prod

FROM node:14.8.0-alpine3.11
ENV TZ Asia/Shanghai

ENV DEBUG=off \
  NODE_ENV=production \
  APP_PORT=80

RUN mkdir app
WORKDIR /app
COPY --from=build /build/node_modules node_modules/
COPY ./ ./

# Start
CMD ["npm", "run", "server"]
