---

# Node.js Authentication System

## Overview

Welcome to the **Node.js Authentication System**! This project provides a robust authentication solution for web applications. It includes features for user registration, login, profile management, email verification, and more. The system is built using modern technologies and follows best practices to ensure security, scalability, and ease of use.

## Key Features

- **User Authentication**: Secure user registration, login, and logout functionalities using JSON Web Tokens (JWT).
- **Profile Management**: Users can manage their profiles, including uploading and updating profile pictures.
- **Email Verification**: Verify user email addresses to activate accounts and ensure validity.
- **CSRF Protection**: Guard against Cross-Site Request Forgery (CSRF) attacks with dedicated middleware.
- **Rate Limiting**: Prevent abuse and excessive requests with built-in rate limiting.
- **Error Handling**: Receive structured error responses for easier debugging and problem resolution.
- **Logging**: Detailed logging for monitoring system performance and troubleshooting issues.
- **Environment Configuration**: Manage configuration settings with environment variables.

## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Express**: A minimal and flexible Node.js web application framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for flexible and scalable data storage.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens.
- **bcryptjs**: Library for hashing and comparing passwords securely.
- **csurf**: Middleware for adding CSRF protection to your Express application.
- **express-rate-limit**: Middleware to rate limit API requests and prevent abuse.
- **express-session**: Middleware for managing session data.
- **dotenv**: Library for loading environment variables from a `.env` file.
- **multer**: Middleware for handling multipart/form-data, used for file uploads.
- **nodemailer**: Library for sending emails from Node.js applications.
- **winston**: A versatile logging library for Node.js applications.
- **eslint**: A tool for identifying and fixing problems in JavaScript code.
- **express-validator**: A set of express.js middlewares that wraps validator.js for validating and sanitizing request data.
- **rate-limit-mongo**: Middleware for rate limiting using MongoDB.
- **connect-mongo**: MongoDB session store for Express sessions.
- **helmet**: Middleware for securing HTTP headers.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.

## Project Structure

The project is organized into several key directories and files:

```plaintext
project-root/
│
├── node_modules/                        # Project dependencies
│
├── Postman Collections/                 # Postman collections for API testing
│   └── Complete_Auth_POSTMAN.json       # Postman collection for authentication endpoints
│
├── src/                                 # Source code
│   ├── config/                          # Configuration files
│   │   ├── db.connect.js                # Database connection configuration
│   │   ├── email.config.js              # Email service configuration
│   │   ├── env.config.js                # Environment variable settings
│   │   ├── middleware.config.js         # Middleware configuration
│   │   └── routes.config.js             # Route settings
│   │
│   ├── controllers/                     # Request handlers for different endpoints
│   │   ├── auth.controller.js           # Logic for authentication (login, register, logout)
│   │   ├── email.controller.js          # Logic for email verification
│   │   ├── profile.controller.js        # Logic for managing user profiles
│   │   └── user.controller.js           # Logic for managing user data
│   │
│   ├── middlewares/                     # Custom middleware functions
│   │   ├── auth.middleware.js           # Middleware for user authentication
│   │   ├── csrf.middleware.js           # Middleware for CSRF protection
│   │   ├── error.middleware.js          # Middleware for handling errors
│   │   ├── uploadProfilePicture.middleware.js  # Middleware for handling profile picture uploads
│   │   └── validate.middleware.js       # Middleware for validating request data
│   │
│   ├── models/                          # Mongoose models for MongoDB collections
│   │   ├── revokedToken.model.js        # Model for revoked tokens
│   │   ├── profile.model.js             # Model for user profiles
│   │   └── user.model.js                # Model for user data
│   │
│   ├── routes/                          # API routes definitions
│   │   ├── auth.routes.js               # Routes for authentication operations
│   │   ├── email.routes.js              # Routes for email-related operations
│   │   └── user.routes.js               # Routes for user management
│   │
│   ├── services/                        # Business logic and service layer
│   │   ├── auth.service.js              # Services for authentication
│   │   ├── email.service.js             # Services for handling emails
│   │   ├── profile.service.js           # Services for managing profiles
│   │   ├── token.service.js             # Services for token management
│   │   └── user.service.js              # Services for user-related operations
│   │
│   ├── utils/                           # Utility functions and helpers
│   │   ├── logger.utils.js              # Utilities for logging
│   │   └── token.utils.js               # Utilities for handling tokens
│   │
│   └── validations/                     # Validation schemas for request data
│       └── auth.validations.js          # Validation logic for authentication requests
│
├── app.js                              # Entry point of the application
├── server.js                           # Server setup and configuration
│
├── uploads/                            # Directory for uploaded files
│   ├── certificates/                   # Uploaded certificates
│   └── profilePictures/                # Uploaded profile pictures
│
├── .env                                # Environment variable settings
├── .gitignore                           # Git ignore file to exclude files from version control
├── endpoints.md                        # Documentation for API endpoints
├── eslint.config.js                    # ESLint configuration file
├── package.json                        # Project metadata and dependencies
├── pnpm-lock.yaml                      # PNPM lock file for dependencies
└── README.md                           # Project overview and instructions
```

## Getting Started

To get the application up and running on your local machine, follow these steps:

### Installation Instructions

#### **Option 1: Using PNPM (Recommended)**

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/complete_node_auth.git
    cd complete_node_auth
    ```

2. **Install Dependencies**:
    ```bash
    pnpm install
    ```

3. **Set Up Environment Variables**:
    - Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    - Open the `.env` file and configure the necessary environment variables.

4. **Start the Application**:
    - For development, run:
    ```bash
    pnpm dev
    ```
    - For production, run:
    ```bash
    pnpm start
    ```

#### **Option 2: Using NPM**

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/complete_node_auth.git
    cd complete_node_auth
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    - Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    - Open the `.env` file and configure the necessary environment variables.

4. **Start the Application**:
    - For development, run:
    ```bash
    npm run dev
    ```
    - For production, run:
    ```bash
    npm start
    ```

#### **Option 3: Using Yarn**

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/complete_node_auth.git
    cd complete_node_auth
    ```

2. **Install Dependencies**:
    ```bash
    yarn install
    ```

3. **Set Up Environment Variables**:
    - Open the `.env` file and configure the necessary environment variables.

4. **Start the Application**:
    - For development, run:
    ```bash
    yarn dev
    ```
    - For production, run:
    ```bash
    yarn start
    ```

## Configuration

- **Database Connection**: Configure your MongoDB connection settings in `src/config/db.connect.js`.
- **Email Settings**: Update your email service configuration in `src/config/email.config.js`.
- **Environment Variables**: Modify the `.env` file with your specific settings.

## API Endpoints

Detailed API endpoint documentation can be found in the provided [Postman Collection](#postman-collection).

### Authentication Endpoints

- **Register**: `POST /auth/register` - Endpoint for user registration.
- **Login**: `POST /

auth/login` - Endpoint for user login.
- **Logout**: `POST /auth/logout` - Endpoint for user logout.

### User Management Endpoints

- **Get All Users**: `GET /user/get-all-users` - Retrieve a list of all users.
- **Get User by ID**: `GET /user/get-user/:id` - Retrieve a specific user by ID.
- **Update User**: `PATCH /user/update-user/:id` - Update details of a user.
- **Delete User**: `DELETE /user/remove-user/:id` - Remove a user by ID.

### Email Verification Endpoints

- **Verify Email**: `GET /email/verify-email/:token` - Verify a user's email address.
- **Resend Verification Email**: `POST /email/resend-verification` - Resend a verification email if needed.

### Profile Management Endpoints

- **Get Profile**: `GET /user/profile/:id` - Retrieve a user's profile.
- **Update Profile**: `PATCH /user/profile/:id` - Create or update a user's profile.

## Postman Collection

To test and explore the API, import the `Complete_Auth_POSTMAN.json` file into Postman. This collection includes all the API endpoints and examples for requests.

## License

This project is licensed under the ISC License. For more details, see the [LICENSE](LICENSE) file.

---
