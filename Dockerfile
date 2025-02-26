# Base image
FROM php:8.4-fpm

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
    libsqlite3-dev \
    nginx \
    sudo

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Install Composer dependencies
RUN composer install

# Install npm dependencies
RUN npm install
RUN npm rebuild
RUN npm run build

# Set permissions for SQLite and storage
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache /var/www

# Set correct permissions for SQLite database
RUN touch /var/www/database/database.sqlite
RUN chown -R www-data:www-data /var/www/database
RUN chmod -R 775 /var/www/database

# Generate application key
RUN php artisan key:generate

# Expose port 8080 for nginx
EXPOSE 8080

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Give execute permissions to start.sh
RUN chmod +x /var/www/start.sh

# Add nginx permissions for www-data user
RUN echo "www-data ALL=(ALL) NOPASSWD: /usr/sbin/nginx" >> /etc/sudoers.d/www-data

# Enable PHP error logging
RUN echo "error_log = /var/log/php_errors.log" >> /usr/local/etc/php/conf.d/docker-php-errors.ini

# Ensure necessary directories for Nginx
RUN mkdir -p /var/lib/nginx/body /run/nginx /tmp/nginx/body
RUN chown -R www-data:www-data /var/lib/nginx /run/nginx /tmp/nginx/body
RUN chmod -R 755 /var/lib/nginx /run/nginx /tmp/nginx/body

# Switch to www-data user
USER www-data

# Run start.sh to start services
CMD ["/var/www/start.sh"]
