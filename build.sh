#!/usr/bin/env bash
# exit on error
set -o errexit

# --- Backend build ---
echo "Installing Python dependencies..."
pip install -r requirements.txt

# --- Frontend build ---
echo "Installing Node dependencies..."
# Render detectará bun.lockb y usará bun si está disponible, sino npm
if [ -f bun.lockb ]; then
  bun install
  echo "Building frontend with Bun..."
  bun run build
else
  npm install
  echo "Building frontend with NPM..."
  npm run build
fi

echo "Build process completed!"
