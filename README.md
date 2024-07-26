# Node.js Authentication System

## Overview

Welcome to the Node.js Authentication System project! This application is designed to handle user authentication, profile management, and email verification. It uses modern technologies and best practices to ensure a secure and efficient system.

## Features

- **User Authentication**: Secure user registration, login, and logout using JWT (JSON Web Tokens).
- **Profile Management**: Manage user profiles, including uploading profile pictures.
- **Email Verification**: Verify email addresses to activate user accounts.
- **CSRF Protection**: Protect against Cross-Site Request Forgery attacks.
- **Rate Limiting**: Limit the number of requests to prevent abuse.
- **Error Handling**: Structured error responses for easier debugging.
- **Logging**: Detailed logs for monitoring and troubleshooting.
- **Environment Configuration**: Manage environment settings easily.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling tool.
- **jsonwebtoken**: Library for handling JSON Web Tokens.
- **bcryptjs**: Library for hashing passwords.
- **csurf**: Middleware for CSRF protection.
- **express-rate-limit**: Middleware for rate limiting API requests.
- **express-session**: Middleware for session management.
- **dotenv**: Library for managing environment variables.
- **multer**: Middleware for handling file uploads.
- **nodemailer**: Library for sending emails.
- **winston**: Library for logging.
- **eslint**: Tool for ensuring code quality.
- **express-validator**: For validating and sanitizing request data.
- **rate-limit-mongo**: For rate limiting using MongoDB.
- **connect-mongo**: For storing session data in MongoDB.
- **helmet**: For securing HTTP headers.
- **cors**: For enabling Cross-Origin Resource Sharing.
```markdown
## Project Structure

Here’s how the project is organized:

project-root/
│
├── node_modules/                        # Dependencies installed by npm or pnpm
│
├── Postman Collections/                 # Postman collection for testing the API
│   └── Complete_Auth_POSTMAN.json
│
├── src/                                 # Source code
│   ├── config/                          # Configuration files
│   │   ├── db.connect.js                # Database connection settings
│   │   ├── email.config.js              # Email configuration
│   │   ├── env.config.js                # Environment variables
│   │   ├── middleware.config.js         # Middleware settings
│   │   └── routes.config.js             # Route settings
│   │
│   ├── controllers/                     # Functions to handle API requests
│   │   ├── auth.controller.js           # Authentication logic
│   │   ├── email.controller.js          # Email verification logic
│   │   ├── profile.controller.js        # Profile management
│   │   └── user.controller.js           # User management
│   │
│   ├── middlewares/                     # Middleware functions
│   │   ├── auth.middleware.js           # Authentication checks
│   │   ├── csrf.middleware.js           # CSRF protection
│   │   ├── error.middleware.js          # Error handling
│   │   ├── uploadProfilePicture.middleware.js  # Handling profile picture uploads
│   │   └── validate.middleware.js       # Request validation
│   │
│   ├── models/                          # Database models
│   │   ├── revokedToken.model.js        # Revoked tokens
│   │   ├── profile.model.js             # User profiles
│   │   └── user.model.js                # User data
│   │
│   ├── routes/                          # API routes
│   │   ├── auth.routes.js               # Routes for authentication
│   │   ├── email.routes.js              # Routes for email verification
│   │   └── user.routes.js               # Routes for user management
│   │
│   ├── services/                        # Business logic and services
│   │   ├── auth.service.js              # Services for authentication
│   │   ├── email.service.js             # Services for email handling
│   │   ├── profile.service.js           # Services for profile management
│   │   ├── token.service.js             # Token management services
│   │   └── user.service.js              # User services
│   │
│   ├── utils/                           # Utility functions
│   │   ├── logger.utils.js              # Logging utilities
│   │   └── token.utils.js               # Token utilities
│   │
│   └── validations/                     # Validation schemas
│       └── auth.validations.js          # Authentication validation
│
├── app.js                              # Main application file
├── server.js                           # Server setup and configuration
│
├── uploads/                            # Uploaded files
│   ├── certificates/                   # Certificates
│   └── profilePictures/                # Profile pictures
│
├── .env                                # Environment variables
├── .gitignore                           # Git ignore file
├── endpoints.md                        # Documentation for API endpoints
├── eslint.config.js                    # ESLint configuration
├── package.json                        # Project metadata and dependencies
├── pnpm-lock.yaml                      # PNPM lock file
└── README.md                           # Project overview and instructions
```

## Getting Started

To get the application up and running, follow these steps:

### Installation Options

#### **Option 1: Using PNPM (Preferred)**

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
    - Copy the `.env.example` file to `.env`.
    - Edit the `.env` file to include your configuration details.

4. **Start the Application**:
    - For development, use:
    ```bash
    pnpm dev
    ```
    - For production, use:
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
    - Copy the `.env.example` file to `.env`.
    - Edit the `.env` file to include your configuration details.

4. **Start the Application**:
    - For development, use:
    ```bash
    npm run dev
    ```
    - For production, use:
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
    - Copy the `.env.example` file to `.env`.
    - Edit the `.env` file to include your configuration details.

4. **Start the Application**:
    - For development, use:
    ```bash
    yarn dev
    ```
    - For production, use:
    ```bash
    yarn start
    ```

## Configuration

- **Database Connection**: Configure your MongoDB connection in `src/config/db.connect.js`.
- **Email Settings**: Update email settings in `src/config/email.config.js`.
- **Environment Variables**: Modify your `.env` file with the necessary configuration.

## API Endpoints

You can find detailed information about the available API endpoints in the [Postman Collection](#postman-collection).

### Authentication Endpoints

- **Register**: `POST /auth/register` - Create a new user.
- **Login**: `POST /auth/login` - Authenticate a user.
- **Logout**: `POST /auth/logout` - Log out a user.

### User Management Endpoints

- **Get All Users**: `GET /user/get-all-users` - Retrieve all users.
- **Get User by ID**: `GET /user/get-user/:id` - Retrieve a user by ID.
- **Update User**: `PATCH /user/update-user/:id` - Update a user's details.
- **Delete User**: `DELETE /user/remove-user/:id` - Remove a user by ID.

### Email Verification Endpoints

- **Verify Email**: `GET /email/verify-email/:token` - Verify a user's email address.
- **Resend Verification Email**: `POST /email/resend-verification` - Resend a verification email.

### Profile Management Endpoints

- **Get Profile**: `GET /user/profile/:id` - Retrieve a user's profile.
- **Update Profile**: `PATCH /user/profile/:id` - Create or update a user's profile.

## Postman Collection

To test and interact with the API, you can use the Postman collection provided. Import the `Complete_Auth_POSTMAN.json` file into Postman to explore the endpoints.

## License

This project is

 licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
```
