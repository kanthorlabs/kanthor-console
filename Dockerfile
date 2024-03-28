FROM refinedev/node:18 AS base

FROM base as deps

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN npm ci

FROM base as builder
ENV NODE_ENV production

COPY --from=deps /app/refine/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine as runner
ENV NODE_ENV production

COPY --from=builder /app/refine/dist /usr/share/nginx/html
COPY  --from=builder /app/refine/docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]