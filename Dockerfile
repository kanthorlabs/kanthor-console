FROM node:20 AS build
WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/docker/nginx/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
