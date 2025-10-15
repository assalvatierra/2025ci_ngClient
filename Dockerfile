# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:latest

# Install envsubst for environment variable substitution
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

# Copy the built app
COPY --from=build /app/dist/client/browser /usr/share/nginx/html

# Copy config template
COPY config.template.json /usr/share/nginx/html/assets/config.template.json

# Copy startup script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set default environment variables
ENV API_URL=http://localhost:5131
ENV APP_NAME="Angular Client Docker"
ENV PRODUCTION=true

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
