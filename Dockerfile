# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
COPY server.js .
ENV PORT=80
EXPOSE 80
CMD ["node", "server.js"]