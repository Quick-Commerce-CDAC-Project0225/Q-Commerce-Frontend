# --- Build stage (smaller) ---
FROM node:20-alpine AS build
WORKDIR /app

# install deps with clean cache
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# copy source and build; pass API base at build time if needed
COPY . .
# e.g., docker build --build-arg VITE_API_BASE=http://65.1.207.157:8080
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE
RUN npm run build

# --- Runtime stage (tiny) ---
FROM nginx:stable-alpine
# (optional) custom nginx.conf already present in your repo
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
