#!/bin/bash

# Substitute environment variables in config template
envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json

# Remove the template file to clean up
rm /usr/share/nginx/html/assets/config.template.json

# Execute the main command
exec "$@"
