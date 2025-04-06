# Pokemon API - Backend

This is the backend service for the Pokemon voting application. It's built with [Elysia.js](https://elysiajs.com/), a TypeScript framework for Bun runtime.

## Table of Contents

- [Pokemon API - Backend](#pokemon-api---backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Folder Structure](#folder-structure)
    - [Feature Module Structure](#feature-module-structure)
  - [API Documentation](#api-documentation)
    - [Pokemon API Endpoints](#pokemon-api-endpoints)
  - [Path Aliases](#path-aliases)
  - [Features](#features)

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
├── features/            # Feature modules
│   └── pokemon/         # Pokemon feature
│       ├── _domain/     # Domain models and types
│       ├── _lib/        # Infrastructure implementation
│       ├── pokemon-routes.ts   # API routes/controllers
│       └── pokemon-service.ts  # Business logic
├── domain/              # Shared domain entities and interfaces
├── libs/                # Shared infrastructure implementation
├── services/            # Shared services
├── use-cases/           # Application use cases
├── index.ts             # Application entry point
└── *.ts                 # Legacy files (to be migrated)
```

### Feature Module Structure

Each feature follows this structure:

- **\_domain/**: Contains domain models and types specific to the feature
- **\_lib/**: Infrastructure implementations like repository adapters
- **routes.ts**: API routes and controllers
- **service.ts**: Business logic and application services

## API Documentation

API documentation is available using Swagger UI at `/swagger` endpoint.

### Pokemon API Endpoints

- `GET /pokemon/pair` - Get a random pair of Pokemon for voting
- `POST /pokemon/vote` - Vote for a Pokemon
- `GET /pokemon/results` - Get voting results

## Path Aliases

This project uses path aliases to make imports cleaner:

- `~/` - Points to the src directory

Example:

```typescript
// Instead of this:
import { something } from "../../domain/entities/something";

// Use this:
import { something } from "~/domain/entities/something";
```

## Features

- **Clean Architecture**: Separation of concerns with layers
- **Feature-based Organization**: Features are self-contained
- **Type Safety**: Full TypeScript support
- **API Documentation**: Swagger integration
- **Authentication**: JWT-based authentication
