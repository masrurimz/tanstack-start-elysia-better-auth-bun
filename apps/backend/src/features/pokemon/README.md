# Pokemon Feature Module

This module handles the Pokemon voting feature of the application.

## Structure

```
pokemon/
├── _domain/             # Domain models and types
│   └── pokemon-model.ts # Elysia validation models
├── _lib/                # Infrastructure implementations
│   └── pokemon-drizzle-db-repo.ts # Database repository
├── pokemon-routes.ts    # API routes/controllers
├── pokemon-service.ts   # Business logic
└── README.md            # This file
```

## API Endpoints

This feature provides three main endpoints:

### 1. Get Random Pokemon Pair

```
GET /pokemon/pair
```

Returns two random Pokemon for voting. The pair is selected from a pool of 1025 Pokemon.

### 2. Vote for a Pokemon

```
POST /pokemon/vote
```

Records a vote for one Pokemon against another.

Request body:

```json
{
	"votedForId": 25,
	"votedAgainstId": 94
}
```

### 3. Get Voting Results

```
GET /pokemon/results
```

Returns the current voting results for all Pokemon, sorted by win percentage.

## Implementation Details

- **Controller Pattern**: Uses Elysia instances as controllers with method chaining
- **Clean Architecture**: Separates domain, application, and infrastructure concerns
- **Type Safety**: Full TypeScript support with proper interfaces and types
- **Validation**: Request validation using Elysia's schema validation

## Swagger Documentation

The API is documented using Swagger UI. Navigate to `/swagger` to see the interactive documentation.

## Using Path Aliases

This module uses the tilde alias (`~`) for clean imports:

```typescript
// Example
import { something } from "~/domain/entities/something";
```
