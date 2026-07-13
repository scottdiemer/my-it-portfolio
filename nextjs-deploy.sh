#!/bin/bash

# Exit immidiately if a command exits with an error
set -e

echo "Starting Next.js deployment..."

echo "Pulling latest updates from github..."
git pull origin main

# Check if package.json changed, if so install new packages
# (Using --legacy-peer-deps to bypass React/Next version conflict)
echo "Installing any new dependencies..."
npm ci

echo "Build the production Next.js application..."
npm run build

# Restart the application
pm2 restart my-it-portfolio

echo "Deployment completed successfully!"
