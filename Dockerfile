# Stage 1: Build the PHP environment
FROM php:8.4-fpm AS php

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3 \
    nginx \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel application files
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Generate Laravel key
RUN php artisan key:generate --force

# Set permissions for the SQLite database
RUN chown -R www-data:www-data /var/www/html/database && \
    chmod -R 777 /var/www/html/database

# Set permissions for storage and bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Stage 2: Build the Node.js environment
FROM node:23.6.0-alpine AS node

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build frontend assets (e.g., React, Vue)
RUN npm run build

# Stage 3: Final image with Nginx and PHP-FPM
FROM php:8.4-fpm

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy Nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the PHP and Node stages
COPY --from=php /var/www/html /var/www/html
COPY --from=node /app/public /var/www/html/public

# Copy start script
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Expose port 80
EXPOSE 80

# Start Nginx and PHP-FPM
CMD ["/usr/local/bin/start.sh"]
