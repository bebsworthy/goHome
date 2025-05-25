# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package-specific files
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/server/package.json ./packages/server/package.json

# Install all dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build UI
RUN cd packages/ui && pnpm build

# Build server with TypeScript
RUN cd packages/server && pnpm build

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/server/package.json ./packages/server/package.json

# Install production dependencies only
RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile

# Copy built files
COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/ui/dist ./packages/server/public

# Copy TypeScript configuration and source maps (for better error reporting)
COPY packages/server/tsconfig.json ./packages/server/
COPY packages/server/src ./packages/server/src

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "--enable-source-maps", "packages/server/dist/index.js", "--mock"] 