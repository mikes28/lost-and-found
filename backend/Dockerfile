FROM node:22-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install
# Rebuild sqlite3 native addon inside the image to match the image's libc
RUN npm rebuild sqlite3 --build-from-source || true

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
