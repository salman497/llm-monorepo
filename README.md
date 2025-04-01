# Monorepo with React, TypeScript, and Azure Functions

This is a monorepo project that demonstrates the integration of React, TypeScript, and Azure Functions using npm workspaces.

## Project Structure

```
llm-monorepo/
├── src/
│   ├── libs/
│   │   └── utils/         # Shared utility functions
│   └── apps/
│       ├── dev-host/      # React app for development
│       └── func-utils-testing/ # Azure Functions app
├── package.json           # Root package.json with workspace config
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v7 or later) for workspaces support
- Azure Functions Core Tools (for local function development)

### Installation

1. Clone this repository
   ```bash
   git clone <repository-url>
   cd llm-monorepo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build all packages
   ```bash
   npm run build
   ```

### Development

To start the development environment (both React app and Azure Functions)

```bash
npm run dev
```

This will run the React app at http://localhost:3000 and the Azure Functions at http://localhost:7071.

### Individual Commands

- Build everything: `npm run build`
- Build utils library: `npm run build:utils`
- Build all apps: `npm run build:apps`
- Start React app: `npm run start:dev-host`
- Start Azure Functions: `npm run start:func`
- Run tests: `npm test`

## Packages

### @monorepo/utils

A shared library of utility functions for string manipulation, including:
- `reverseString`: Reverses a string
- `isPalindrome`: Checks if a string is a palindrome
- `capitalize`: Capitalizes the first letter of each word

### @monorepo/dev-host

A React application that provides a UI for testing the Azure Functions and utils library.

### @monorepo/func-utils-testing

An Azure Functions app that uses the utils library to process text through HTTP triggers.

## Deployment

The project includes a GitHub Actions workflow for CI/CD. When you push to the main branch, it will:
1. Build and test the packages
2. Deploy the Azure Functions app

### Setting Up Azure Deployment

You'll need to add the following secrets to your GitHub repository:
- `AZURE_CREDENTIALS`: Azure service principal credentials
- `AZURE_FUNCTION_APP_NAME`: The name of your Azure Function App
- `AZURE_FUNCTION_PUBLISH_PROFILE`: The publish profile for your Azure Function App

## License

ISC 