import fs from 'fs';
import path from 'path';

// Helper function to create directories
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
};

// Helper function to create files with optional content
const createFile = (filePath, content = '') => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  }
};

// Project structure
const projectStructure = {
  src: {
    config: ['config.js', 'db.js'],
    controllers: ['authController.js', 'userController.js'],
    middlewares: ['authMiddleware.js', 'errorHandler.js'],
    models: ['userModel.js'],
    routes: ['authRoutes.js', 'userRoutes.js'],
    services: ['authService.js', 'emailService.js'],
    utils: ['logger.js'],
    validations: ['authValidation.js'],
    'app.js': '',
  },
  public: {},
  tests: {
    controllers: [],
    services: [],
    middlewares: [],
  },
  '.env': '',
  'package.json': JSON.stringify({
    name: 'express-app',
    version: '1.0.0',
    description: '',
    main: 'server.js',
    scripts: {
      start: 'node server.js',
    },
    dependencies: {},
  }, null, 2),
  'README.md': '# Express App',
  'server.js': `import express from 'express';
const app = require('./src/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`,
};

// Function to recursively create project structure
const createStructure = (basePath, structure) => {
  Object.keys(structure).forEach((key) => {
    const currentPath = path.join(basePath, key);
    if (typeof structure[key] === 'object') {
      // Create directory
      createDirectory(currentPath);
      createStructure(currentPath, structure[key]);
    } else {
      // Create file
      createFile(currentPath, structure[key]);
    }
  });
};

// Define the root path for the project
const rootPath = path.join(path.resolve());

// Create project structure
createStructure(rootPath, projectStructure);
