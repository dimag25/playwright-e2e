# Pinned to match @playwright/test in package.json — keeps browsers & deps in sync.
FROM mcr.microsoft.com/playwright:v1.61.0-noble

WORKDIR /app
ENV CI=true
ENV PATH="/app/node_modules/.bin:${PATH}"

# Install dependencies first for better layer caching.
COPY package*.json ./
RUN npm ci

# Copy the rest of the project.
COPY . .

# Browsers are preinstalled in the base image. Run the suite by default.
CMD ["npx", "playwright", "test"]
