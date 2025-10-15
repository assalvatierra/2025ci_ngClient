# Angular Environment Configuration with Docker

This Angular application supports dynamic environment variable configuration that can be provided at runtime via Docker.

## Environment Variables

The following environment variables can be configured:

- `API_URL`: The base URL for the API server (default: `http://localhost:5131`)
- `APP_NAME`: The application name displayed in the UI (default: `Angular Client Docker`)
- `PRODUCTION`: Whether the app is running in production mode (default: `true`)

## Configuration Methods

### 1. Development Mode

For local development, the configuration is loaded from:
1. `src/environments/environment.ts` (development)
2. `src/environments/environment.prod.ts` (production build)

### 2. Runtime Configuration (Docker)

For Docker deployments, the configuration is loaded from `/assets/config.json` at runtime.

### 3. Docker Environment Variables

When running in Docker, environment variables are substituted into the config.json file at container startup.

## Usage Examples

### Docker Run

```bash
docker build -t angular-client .
docker run -p 4200:80 \
  -e API_URL=https://api.example.com \
  -e APP_NAME="My Angular App" \
  -e PRODUCTION=true \
  angular-client
```

### Docker Compose

```yaml
version: '3.8'
services:
  angular-client:
    build: .
    ports:
      - "4200:80"
    environment:
      - API_URL=https://api.example.com
      - APP_NAME=My Angular App
      - PRODUCTION=true
```

### Environment File

Create a `.env` file:
```env
API_URL=https://api.example.com
APP_NAME=My Angular App
PRODUCTION=true
```

Then use with docker-compose:
```bash
docker-compose --env-file .env up
```

## File Structure

```
src/
├── environments/
│   ├── environment.ts          # Development configuration
│   └── environment.prod.ts     # Production configuration
├── assets/
│   └── config.json            # Runtime configuration (generated)
└── app/
    └── services/
        ├── config.service.ts   # Configuration service
        └── app-initializer.ts  # App initialization logic

config.template.json           # Template for Docker config generation
docker-entrypoint.sh          # Docker startup script
Dockerfile                    # Docker build configuration
docker-compose.yml           # Docker compose example
```

## Configuration Loading Order

1. App starts and runs `APP_INITIALIZER`
2. `ConfigService.loadConfig()` attempts to load `/assets/config.json`
3. If config.json exists (Docker runtime), it overrides environment defaults
4. If config.json fails to load (local dev), falls back to environment.ts
5. App continues with loaded configuration

## Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Build Docker image
docker build -t angular-client .

# Run with docker-compose
docker-compose up
```

## Testing

The configuration service is mocked in tests. Update test files to include `HttpClientTestingModule` when testing components that use `ConfigService`.