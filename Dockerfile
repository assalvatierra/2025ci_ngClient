# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install

# Set build-time environment variables with defaults
ARG API_URL=http://localhost:5131
ARG APP_NAME="Angular Client Docker"
ARG PRODUCTION=true

# Create environment file for Angular build
RUN echo "export const environment = { \
  production: ${PRODUCTION}, \
  apiUrl: '${API_URL}', \
  appName: '${APP_NAME}' \
};" > src/environments/environment.ts

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:latest

# Copy the built app
COPY --from=build /app/dist/client/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
