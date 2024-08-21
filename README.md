# ManageQL

ManageQL is a small project management system built with GraphQL, Apollo, TypeScript, Express.js, MongoDB, React, and more. The main focus of this project is to manage APIs via GraphQL instead of the traditional RESTful approach.

## Features

- **GraphQL API**: Manage your APIs with a powerful and flexible GraphQL endpoint.
- **TypeScript**: Benefit from static typing to enhance code quality and developer experience.
- **React**: Build dynamic and interactive user interfaces with React.
- **MongoDB**: Store and manage data using MongoDB, a popular NoSQL database.
- **Express.js**: A minimal and flexible Node.js web application framework.

## Screenshots

![Home page](/client/public/images/1.png)

![Add Project](/client/public/images/2.png)

![Add Client](/client/public/images/3.png)

![Edit Project](/client/public/images/4.png)

## Installation

### Clone the repository:

    git clone https://github.com/CAPELLAX02/ManageQL.git

    cd ManageQL

### Install dependencies:

    npm install

    cd client

    npm install

    cd ..

### Rename the example.env file to .env and fill in the following environment variables:

- Get your MongoDB connection string from your MongoDB Atlas cluster and add it to `MONGODB_URI`.

- `.env` file should look like the following:

```
  NODE_ENV = 'development'
  PORT = 5000
  MONGO_URI = your mongodb uri
```

### Usage

- To start the development server:

  ```bash
  npm run dev
  ```

- The client-side of the application will be running at http://localhost:3000 whereas the server will be runnig at http://localhost:5000.

### Scripts

`npm run start` starts the server using Node.js. `npm run server` starts the server using Nodemon for automatic restarts. `npm run client` starts the client side of the application. `npm run dev` runs both the server and client concurrently in development mode.
