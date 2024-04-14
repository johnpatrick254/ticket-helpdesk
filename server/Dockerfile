# Base image with common PHP configurations
FROM php:8.1-fpm-alpine AS Base

# Install common PHP extensions and configurations
RUN apk update && \
    apk add --no-cache \
    postgresql-dev \
    zlib-dev

# Configure PHP extensions
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
    docker-php-ext-install pdo pdo_pgsql pgsql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy application code
COPY . .

# Install all dependencies including dev dependencies
RUN composer install --prefer-source --no-interaction

# Development stage
FROM Base AS Development

# Install additional development dependencies
RUN apk add --no-cache \
    build-base \
    git \
    zip

# Production stage
FROM Base AS Production

# Install only necessary production dependencies
RUN apk add --no-cache \
    postgresql-client
