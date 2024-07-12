
# Build AdonisJS
FROM node:20-alpine as builder
# Set directory for all files
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./
# Install all packages
RUN npm install
# Copy over source code
COPY . .
# Build AdonisJS for production
RUN npm run build --production


# Build final runtime container
FROM node:20-alpine
ENV NODE_ENV=production
ENV ENV_SILENT=true
ENV HOST=0.0.0.0
ENV PORT=3333
ENV APP_KEY=WX081ck0qq-6HWIZhWe1NzawWKD5n3rG
ENV DRIVE_DISK=local
ENV APP_NAME=porto
ENV DB_CONNECTION=pg
ENV PG_HOST=0.0.0.0
ENV PG_PORT=5435
ENV PG_USER=portoin
ENV PG_PASSWORD=portoin
ENV PG_DB_NAME=portoin
ENV CACHE_VIEWS=false

# Set home dir
WORKDIR /home/node/app
# Copy over built files
COPY --from=builder /home/node/app/build .
COPY --from=builder /home/node/app/docs ./docs
# Install only required packages
RUN npm ci --production
RUN node ace swagger:generate
# Expose port to outside world
EXPOSE 3333
# Start server up
CMD [ "node", "server.js" ]