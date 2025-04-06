# Pokemon API - Backend

This is the backend service for the Pokemon voting application. It's built with [Elysia.js](https://elysiajs.com/), a TypeScript framework for Bun runtime.

## Table of Contents

- [Pokemon API - Backend](#pokemon-api---backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Folder Structure](#folder-structure)
    - [Feature Module Structure](#feature-module-structure)
  - [API Documentation](#api-documentation)
    - [Available API Endpoints](#available-api-endpoints)
  - [Path Aliases](#path-aliases)
  - [Features](#features)
  - [Authentication](#authentication)
  - [Development Guidelines](#development-guidelines)

## Getting Started

```bash
# Install dependencies
bun install

# Run the dev server
bun run dev

# Build for production
bun run build
```

The server will be available at <http://localhost:3001> with Swagger documentation at <http://localhost:3001/swagger>.

## Folder Structure

The backend follows a clean architecture approach with a feature-based organization:

```
src/
├── features/            # Feature modules (routes, services, domains)
│   ├── auth/            # Authentication feature
│   ├── count/           # Count feature (example)
│   ├── message/         # Message feature
│   └── pokemon/         # Pokemon feature
├── domain/              # Shared domain entities and interfaces
│   ├── entities/        # Domain entities
│   ├── model/           # Common models
│   └── repositories/    # Repository interfaces
├── libs/                # Shared infrastructure implementation
│   └── better-auth/     # Authentication library integration
├── middlewares/         # Shared middlewares
├── services/            # Shared services
│   └── auth-service.ts  # Authentication service
├── use-cases/           # Application use cases
└── index.ts             # Application entry point
```

### Feature Module Structure

Each feature follows this structure:

```
feature-name/
├── _domain/                # Domain models, types, and validation schemas
├── _lib/                   # Infrastructure implementations (repositories)
├── feature-name-routes.ts  # API routes/controllers (Elysia instances)
├── feature-name-service.ts # Business logic (class-based)
└── README.md               # Feature documentation
```

## API Documentation

API documentation is available using Swagger UI at `/swagger` endpoint.

### Available API Endpoints

- **Pokemon**

  - `GET /pokemon/pair` - Get a random pair of Pokemon for voting
  - `POST /pokemon/vote` - Vote for a Pokemon
  - `GET /pokemon/results` - Get voting results

- **Message**

  - `GET /message` - Get messages
  - `POST /message` - Create a new message

- **Count**

  - `GET /count` - Get the current count
  - `POST /count/increment` - Increment the count

- **Authentication**
  - `/api/auth/*` - Authentication endpoints provided by better-auth

## Path Aliases

This project uses path aliases to make imports cleaner:

- `~/` - Points to the src directory

## Features

- **Clean Architecture**: Separation of concerns with layers
- **Feature-based Organization**: Features are self-contained
- **Type Safety**: Full TypeScript support
- **API Documentation**: Swagger integration
- **Authentication**: Integration with better-auth for JWT-based authentication

## Authentication

This project uses the `better-auth` library for authentication. It provides:

- Email and password authentication
- JWT-based session management
- Integration with Drizzle ORM
- OpenAPI documentation for auth endpoints

## Development Guidelines

1. **Controller Pattern**: Use Elysia instances as controllers with method chaining for routes.

   ```typescript
   // Example: feature-routes.ts
   const FeatureController = new Elysia({ prefix: "/feature" })
   	.get("/", ({ featureService }) => featureService.getAll())
   	.post("/", ({ body, featureService }) =>
   		featureService.create({ data: body }),
   	);
   ```

2. **Service Pattern**: Use class-based services with arrow function methods.

   ```typescript
   // Example: feature-service.ts
   class FeatureService {
   	getAll = () => {
   		return featureRepository.findAll();
   	};
   }
   ```

3. **Repository Pattern**: Define repository interfaces in the domain layer and implement them in feature's \_lib directory.

4. **Validation**: Use Elysia's built-in validation with `t.Object()`.

5. **Documentation**: Add Swagger documentation to all endpoints using the `detail` property.

For complete implementation examples, see the existing feature modules in the codebase, particularly the `count` feature which demonstrates all these patterns.
