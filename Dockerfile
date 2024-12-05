FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM busybox:latest
RUN adduser -D static
WORKDIR /home/static/html
COPY --from=builder /app/dist .
USER static
CMD ["busybox", "httpd", "-f", "-v", "-p", "80", "-h", "/home/static/html"]