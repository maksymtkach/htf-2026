FROM node:22-alpine

# better-sqlite3 requires native compilation
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV DB_FILE_NAME=/data/app.db

CMD ["npm", "run", "dev"]
