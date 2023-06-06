# Use an official Node.js runtime as the base image
FROM node:16.17.1-bullseye-slim

# Install dumb-init to handle signals correctly :(
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the server is listening on
EXPOSE 3000

# Start the server when the container is run
CMD ["dumb-init", "node", "index.js"]