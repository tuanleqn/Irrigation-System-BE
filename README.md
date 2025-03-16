# Irrigation System Backend

This is the backend for the Irrigation System project. It provides APIs for managing users, authentication, and other functionalities related to the irrigation system.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/irrigation-system-be.git
cd irrigation-system-be
```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the necessary environment variables. Refer to the [Environment Variables](#environment-variables) section for more details.

4. Run the development server:

```sh
npm run dev
```

## Usage

To start the server in development mode, run:

```sh
npm run dev
```

To build the project for production, run:

```sh
npm run build
```

To start the server in production mode, run:

```sh
npm run start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. You can access it at `http://localhost:<BE_PORT>/api-docs` or `https://irrigation-system-be.onrender.com/api-docs`.

## Project Structure

```
.editorconfig
.env
.gitignore
.prettierignore
.prettierrc
eslint.config.mjs
guide.txt
nodemon.json
package.json
README.md
tsconfig.json
.vscode/
  settings.json
prisma/
  schema.prisma
  migrations/
    migration_lock.toml
    ...
src/
  index.ts
  type.d.ts
  constants/
  controllers/
  middlewares/
  models/
  routes/
  services/
  utils/
swagger/
  swagger.ts
```

## Scripts

- `npm run dev`: Run the development server with hot reloading.
- `npm run build`: Build the project for production.
- `npm run start`: Start the server in production mode.
- `npm run lint`: Check for linting errors.
- `npm run lint:fix`: Fix linting errors.
- `npm run prettier`: Check for code formatting issues.
- `npm run prettier:fix`: Fix code formatting issues.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
BE_PORT=<your_backend_port>
DATABASE_URL=<your_database_url>
JWT_SECRET_ACCESS_TOKEN=<your_jwt_secret_access_token>
JWT_SECRET_REFRESH_TOKEN=<your_jwt_secret_refresh_token>
PASSWORD_SECRET=<your_password_secret>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the ISC License.
