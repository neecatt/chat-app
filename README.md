# Basic Chat app

This project is a chat app system built using NestJS, MySQL, Prisma, and Docker.

## Prerequisites

- Node.js and npm: Install Node.js and npm from https://nodejs.org/.
- Docker: Install Docker from https://www.docker.com/get-started.
- Docker Compose: Install Docker Compose from https://docs.docker.com/compose/install/.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/neecatt/chat-app.git
   ```

2. Install dependencies:
    ```sh
   npm install
      ```
   
3. Set up environment variables:

Rename .env.example to .env.

4. Build and run the MySQL database using Docker:
   ```sh
   docker-compose up -d 
    ```
   or
   ```sh
   docker compose up -d
   ```
   depending on your system

5. Possibly generate Prisma environment variables and build connection with db using:
   ```sh
   npx prisma generate
   ```

6. Run the application:
   ```sh
   npm run start:dev
   ```

7. Access the application:

* The application will be running at http://localhost:9000.


## Routes
* http://localhost:9000/users/add
* http://localhost:9000/chats/add
* http://localhost:9000/chats/get
* http://localhost:9000/messages/add
* http://localhost:9000/messages/get


