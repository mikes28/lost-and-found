FROM node:22-bookworm-slim

WORKDIR /app
COPY package*.json ./


# Copy the application source
COPY src/ ./src/

EXPOSE 3000

CMD ["node", "./src/app.js"]
 
# Install system build tools so native addons (sqlite3) can be built inside image
RUN apt-get update && apt-get install -y --no-install-recommends \
		python3 \
		make \
		g++ \
		build-essential \
		libsqlite3-dev \
	&& rm -rf /var/lib/apt/lists/*

# Install production dependencies and rebuild native addons to match image's libc
RUN npm ci --omit=dev
RUN npm rebuild sqlite3 --build-from-source || true
