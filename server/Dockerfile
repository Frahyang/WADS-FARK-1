# Base image
FROM node:alpine3.20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

RUN echo "Contents of /app:" && ls -la /app && \
    echo "Contents of /app/server (if exists):" && ls -la /app/server || echo "/app/server not found"

# Expose the application port (replace it with the server_port you received)
EXPOSE 3020

# Command to run the application
CMD ["npm", "start"]