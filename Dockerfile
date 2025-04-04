# Stage 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app with a lightweight server
FROM node:18-slim

# Install serve to serve the static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build /app/dist

# Expose port 3000 (default for serve)
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]