FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Ensure standalone server can find static assets by copying the built static
# files into the standalone bundle's expected location.
RUN mkdir -p .next/standalone/.next && cp -r .next/static .next/standalone/.next/ || true

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
