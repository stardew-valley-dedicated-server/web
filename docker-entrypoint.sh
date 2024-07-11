#!/bin/sh

echo "Starting entrypoint script..."

rm /app/node_modules
mkdir -p /app/node_modules
mv /temp/node_modules /app/node_modules

# All game files are linked into this container
echo "Setting up symlinks..."
ln -s /data/Server /app/public/server

echo "Starting app..."
npm run dev
