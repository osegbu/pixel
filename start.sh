#!/bin/bash

# Replace the $PORT variable in Nginx config
envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

# Start Nginx
nginx

# Start PHP-FPM
php-fpm
