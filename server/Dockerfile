# Base image with common PHP configurations
FROM php:8.1-fpm-alpine AS base

# Install common PHP extensions and configurations
RUN apk update && \
    apk add --no-cache \
    postgresql-dev \
    zlib-dev \
    libpq-dev \
    autoconf \
    gcc \
    g++ \
    make \
    libzip-dev \
    pkgconfig

# Configure and install PHP extensions
RUN docker-php-ext-configure pgsql && \
    docker-php-ext-install pdo pdo_pgsql pgsql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy application code
COPY composer*.json ./


# Development stage
FROM base AS development

# Copy the fpm start script and set execute permissions
COPY fpm.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/fpm.sh

# Install all dependencies including dev dependencies from composer.json
RUN composer install --prefer-source --no-interaction

# Install additional development dependencies
RUN apk add --no-cache \
    build-base \
    git \
    zip

# Production stage
FROM base AS production

# Install only production dependencies from composer.json
RUN composer install --prefer-source --no-interaction --no-dev

#auto load deps
RUN composer dump-autoload --optimize 

WORKDIR /app

# copy application code
COPY . .

# Install only necessary production dependencies
RUN apk add --no-cache \
    postgresql-client

# Start server
CMD ["php", "-S", "0.0.0.0:80"]

