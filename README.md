# Bank Application

Welcome to the Bank Application repository! This is a full-fledged backend banking application built using the MERN stack (MongoDB, Express.js, Node.js). Currently, the focus is on the backend, which handles user authentication, account management, and transaction services. The frontend has also been initiated and includes registration, login, and dashboard functionality.

## Table of Contents

- Bank Application
- Table of Contents
- Project Overview
- Key Features (Backend Only):
- Frontend:
- Features
- Technologies Used
- Backend:
- Frontend:
- Development:
- Installation Instructions
  - Install Backend Dependencies:
  - Install Frontend Dependencies:
  - Environment Configuration:
  - Running the Backend
  - Running the Frontend
- Contribution:
- Contributors:
- License

## Project Overview

The Bank Application is designed to handle core banking functionalities such as user registration, login, account management, and fund transfers. The backend API has been built using Node.js, Express.js, and MongoDB, and is designed to be scalable and secure. The frontend interacts with the backend to provide a user-friendly interface for users.

## Key Features (Backend Only):

- **User Registration & Authentication:** Users can register, log in, and manage their accounts using JWT for secure authentication.
- **Account Management:** Users can create, view, and delete bank accounts.
- **Transaction Management:** Users can view their transaction history and make fund transfers.
- **Admin Panel:** Admins can view, manage user accounts, and oversee transactions.

## Frontend:

The frontend of the application has been initiated and includes the following features:

- **Registration & Login:** User registration and login functionality have been implemented with proper design.
- **User Authorization:** Protected routes have been implemented to ensure secure access to user-specific pages.
- **Dashboard:** A dashboard page has been built to provide users with an overview of their accounts and transactions (styling is pending).

### Technologies Used (Frontend):

- **Vite:** A fast and optimized build tool for modern web projects.
- **React.js:** JavaScript library for building interactive user interfaces.
- **Axios:** For making HTTP requests to the backend API.

### Frontend URL:

The frontend is hosted at: [Frontend Repository](https://github.com/Alphasf9/BANK/tree/main/frontend)

## Features

- **Secure Authentication:** JWT tokens are used for secure user authentication.
- **Account Creation:** Users can create new bank accounts.
- **Transaction History:** Users can view the history of transactions associated with their accounts.
- **Fund Transfers:** Users can transfer funds between their accounts.
- **Admin Management:** Admins have the ability to manage users and view transaction records.

## Technologies Used

The backend of the application is built using the following technologies:

### Backend:

- **Node.js:** JavaScript runtime for building scalable server-side applications.
- **Express.js:** Web application framework for Node.js, simplifying API development.
- **MongoDB:** NoSQL database for storing user and transaction data.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens):** Secure token-based authentication system.
- **bcryptjs:** Password hashing library to ensure secure password storage.
- **dotenv:** To manage environment variables for sensitive information.
- **Cors:** Middleware for enabling cross-origin requests between the client and server.
- **cloudinary:** For managing and storing images, if applicable.
- **connect-mongo:** For session storage using MongoDB.
- **cookie-parser:** To parse cookies for session management.
- **express-session:** For handling user sessions.
- **multer:** Middleware for handling file uploads, if needed.
- **nodemailer:** For sending email notifications (e.g., for account registration or transactions).
- **hunter.io:** For verifying and managing email addresses.

### Development:

- **nodemon:** For auto-reloading the server during development.

## Installation Instructions

To get the backend and frontend of the application up and running locally, follow these steps:

### Install Backend Dependencies:

Navigate to the backend directory and install the required dependencies:

```bash
cd backend 
npm install
```

### Install Frontend Dependencies:

Navigate to the frontend directory and install the required dependencies:

```bash
cd frontend 
npm install
```

### Environment Configuration:

Create a `.env` file in the backend directory and add the following environment variables:

```plaintext
PORT: Port where the server will run (default: 8000).

MONGO_URI: MongoDB connection string.

ACCESS_TOKEN_SECRET: Secret for access token generation.

ACCESS_TOKEN_EXPIRY: Expiry time for the access token (default: 1d).

REFRESH_TOKEN_SECRET: Secret for refresh token generation.

REFRESH_TOKEN_EXPIRY: Expiry time for the refresh token (default: 10d).

CLOUDINARY_CLOUD_NAME: Cloud name for Cloudinary image storage.

CLOUDINARY_API_KEY: API key for Cloudinary.

CLOUDINARY_API_SECRET: API secret for Cloudinary.

SESSION_SECRET_KEY: Secret key for session management.

NODEMAILER_GMAIL_USERNAME: Gmail username for Nodemailer.

NODEMAILER_GMAIL_PASSWORD: Gmail password for Nodemailer.

HUNTER_API_KEY: API Key for Hunter to verify emails.
```

### Running the Backend:

Once you have installed the dependencies and set up the configuration, you can run the backend by following these steps:

1. Navigate to the backend directory.
2. Run the server with:

```bash
npm start 
# OR 
npx nodemon
```

3. The backend API will be accessible at `http://localhost:8000`.

### Running the Frontend:

Once you have installed the dependencies, you can run the frontend by following these steps:

1. Navigate to the frontend directory.
2. Start the development server:

```bash
npm run dev
```

3. The frontend will be accessible at the URL provided by Vite (e.g., `http://localhost:5173`).

## Contribution:

We welcome contributions to improve this project! To contribute, follow these steps:

1. Fork the repository by clicking the Fork button at the top-right corner of this page.
2. Clone your fork to your local machine:

```bash
git clone https://github.com/your-username/BANK.git
```

3. Create a new branch for your feature or bugfix:

```bash
git checkout -b feature-branch
```

4. Make your changes.
5. Commit your changes:

```bash
git commit -m 'Add new feature or fix bug'
```

6. Push your changes to your forked repository:

```bash
git push origin feature-branch
```

7. Open a pull request on GitHub, and describe the changes you have made.

## Contributors:

- **MOHD HASEEB ALI (Alphasf9):** Full stack developer ([GitHub Profile](https://github.com/Alphasf9))
- **Aryan Kumar (Aryan-Kumar-7):** Full stack developer ([GitHub Profile](https://github.com/Aryan-Kumar-7))
- **Shubham Maurya (shubhammauryask):** App developer/Backend Developer ([GitHub Profile](https://github.com/shubhammauryask))
- **Krishnakant Yadav (Kk-0010):** Full stack developer ([GitHub Profile](https://github.com/Kk-0010))

## License

This project is licensed under the MIT License - see the LICENSE file for details.

