#!/bin/bash

# Debug info
echo "Current user: $(whoami)"
echo "Storage permissions: $(ls -l /var/www/storage)"

# Set correct permissions, already done
# chown -R www-data:www-data /var/www/storage
# chmod -R 775 /var/www/storage

# Clear and cache config (for good measure)
php artisan config:clear
php artisan config:cache

# Start nginx
# echo "Starting nginx..."
nginx

# Start php-fpm
# echo "Starting php-fpm..."
php-fpm

# Alternative option:
# Start Laravel server in the foreground
# echo "Starting Laravel server"
# php artisan serve --host=0.0.0.0 --port=8080

# or...

# Start Laravel server in the background (with &)
# php artisan serve --host=0.0.0.0 --port=8080 &
# Start Vite development server
# npm run dev -- --host 0.0.0.0
