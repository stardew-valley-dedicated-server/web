#!/bin/sh

echo "HUUUUUUHU"
rm /app/node_modules
mkdir -p /app/node_modules
mv /temp/node_modules /app/node_modules
npm run dev
