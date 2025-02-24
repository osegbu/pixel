# Pixel

## Overview

Pixel is a modern task management system designed to help individuals and teams organize, track, and complete tasks efficiently. Built using the robust Laravel backend framework with Inertia.js and a React frontend, the application provides a seamless single-page experience while maintaining full backend power. With TypeScript for type safety and maintainable code, the project ensures both stability and scalability.

## Key Features

1. Task Management

    - View All Tasks: A home page that displays all tasks (/).
    - View Specific Task: View the details of a specific task (/task/{task}), with permissions checking to ensure only authorized users can view tasks.
    - Create New Tasks: Authenticated users can create tasks (/create and /task/create).
    - Edit Tasks: Authenticated users can edit existing tasks (/task/edit/{task}) with permission checks in place.
    - Complete Tasks: Users can mark tasks as complete (/task/complete/{task}) with permission checks to ensure only authorized users can update tasks.
    - Delete Tasks: Authenticated users can delete tasks (/task/delete/{task}) with permissions enforced.

2. User Authentication

    - Register Users: Users can register for an account (/register) via a form, and their information is stored in the system.
    - Login Users: Users can log in (/login) and authenticate to access restricted sections of the application.
    - Logout Users: Users can log out from the system (/logout).

3. Permissions and Authorization

    - Task Access Control: Routes for viewing, editing, completing, and deleting tasks are protected with middleware to ensure only authenticated and authorized users can interact with specific tasks.

## Prerequisites

Make sure you have the following installed before proceeding:

-   Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Installation

To get started with Pixel using Docker, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/osegbu/pixel.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd pixel
    ```

3. **Build and run the Docker container:**

    ```bash
    docker build -t pixel-app .
    docker run -p 80:80 pixel-app
    ```

This command will build the Docker image and run the container, exposing the application on port 80.

## Dockerfile Breakdown

This project uses a multi-stage Dockerfile for efficiency. Here’s an overview of each stage:

1. **Stage 1: PHP Environment**

    - Base image: `php:8.4-fpm`
    - Installs required PHP extensions (`pdo_mysql`, `mbstring`, `bcmath`, `gd`, etc.)
    - Installs Composer for managing PHP dependencies
    - Copies the Laravel application files and installs PHP dependencies using Composer
    - Sets proper permissions for the SQLite database and storage/cache directories

2. **Stage 2: Node.js Environment**

    - Base image: `node:23.6.0-alpine`
    - Installs Node.js dependencies and builds frontend assets
    - This stage is responsible for preparing the frontend part of the application

3. **Stage 3: Nginx + PHP-FPM**
    - Base image: `php:8.4-fpm`
    - Installs and configures Nginx
    - Copies files from previous stages (both backend and frontend)
    - Starts both Nginx and PHP-FPM to serve the application

## How It Works

-   **Nginx** serves as the web server and proxies requests to PHP-FPM.
-   **PHP-FPM** handles PHP requests, executing the Laravel backend logic.
-   **Node.js** builds the frontend assets (e.g., for React or Vue) and those assets are served from the public directory.

## Customization

-   If you need to modify the Nginx configuration, you can edit the `nginx.conf` file located at `docker/nginx.conf`.
-   You can add or change environment variables by modifying the Dockerfile or passing them when running the container.

## Running the Application

After running the application in Docker, you can access it by visiting `http://localhost` in your browser.

To stop the container:

```bash
docker stop <container_id>
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Have A Feedback?

Feel free to reach out to me!

-   **Email**: [valentineosegbu@gmail.com](mailto:valentineosegbu@gmail.com)
-   **LinkedIn**: [Obinna Osegbu](https://www.linkedin.com/in/obinna-osegbu-4aa304200/)
-   **Twitter**: [@obinna_osegbu](https://twitter.com/obinna_osegbu)
-   **GitHub Issues**: You can also open an issue on this repository if it's related to the project.
