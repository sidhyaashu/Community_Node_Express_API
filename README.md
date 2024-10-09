# Project Name: Community Website API

University Community Website is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This platform is designed to foster a community space where students, faculty, and alumni can engage in discussions, share resources, and stay connected.

## Technologies
- **MongoDB**: NoSQL database for storing user data and resources.
- **Express.js**: Backend framework for building the server and APIs.
- **React**: Frontend JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side logic.

---

# BACKEND
```plaintext
/
|-- src/
|   |-- config/           # Configuration files (e.g., environment variables)
|   |   |-- config.js
|   |   |-- db.js         # Database configuration and connection (MongoDB, SQL, etc.)
|   |-- controllers/      # Controller functions handling requests
|   |   |-- authController.js
|   |   |-- userController.js
|   |-- middlewares/      # Custom middleware functions
|   |   |-- authMiddleware.js
|   |   |-- errorHandler.js
|   |-- models/           # Database models (Mongoose, Sequelize, etc.)
|   |   |-- userModel.js
|   |-- routes/           # Route definitions
|   |   |-- authRoutes.js
|   |   |-- userRoutes.js
|   |-- services/         # Business logic and reusable services
|   |   |-- authService.js
|   |   |-- emailService.js
|   |-- utils/            # Utility functions
|   |   |-- logger.js
|   |-- validations/      # Request validation schemas (e.g., using Joi or express-validator)
|   |   |-- authValidation.js
|   |-- app.js            # Express app configuration
|-- public/               # Static files (if needed)
|-- tests/                # Unit and integration tests
|   |-- controllers/
|   |-- services/
|   |-- middlewares/
|-- .env                  # Environment variables
|-- package.json          # Project dependencies and scripts
|-- README.md             # Project documentation
|-- server.js             # Entry point for the server (starts the app)
```

