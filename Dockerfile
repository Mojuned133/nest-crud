# Use official Node.js LTS Alpine image
FROM node:20-alpine

# Enable pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json and pnpm lock file first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN pnpm run build

# Expose the port NestJS uses
EXPOSE 3000

# Run the built app
CMD ["node", "dist/main.js"]
