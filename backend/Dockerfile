FROM node:22-bookworm-slim

WORKDIR /app

# Install build deps for sqlite3 native module
RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 \
  build-essential \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

ENV npm_config_build_from_source=true

# Copy package manifest and install dependencies
COPY package*.json ./
RUN npm install --omit=dev
RUN npm rebuild sqlite3 --build-from-source

# Copy application source
COPY src/ ./src/

EXPOSE 3000

CMD ["npm", "start"]
