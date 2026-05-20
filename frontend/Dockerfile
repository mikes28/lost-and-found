FROM node:22-alpine

WORKDIR /app

COPY .next/ ./.next/
COPY package*.json ./

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
