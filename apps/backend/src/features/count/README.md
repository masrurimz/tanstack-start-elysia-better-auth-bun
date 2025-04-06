# Count Feature Module

This module handles a simple counter that can be incremented via API calls.

## Structure

```
count/
├── _domain/                # Domain models and types
│   └── count-model.ts      # Elysia validation models
├── _lib/                   # Infrastructure implementations
│   └── count-file-repository.ts # File-based repository implementation
├── count-routes.ts         # API routes/controllers
├── count-service.ts        # Business logic
└── README.md               # This file
```

## API Endpoints

This feature provides two main endpoints:

### 1. Get Current Count

```
GET /count
```

Returns the current count value.

### 2. Increment Count

```
POST /count/increment
```

Increments the count by 1 and returns the new value.

Response:

```json
{
	"success": true,
	"message": "Count incremented successfully",
	"count": 42
}
```

## Implementation Details

- **Controller Pattern**: Uses Elysia instances as controllers with method chaining
- **Clean Architecture**: Separates domain, application, and infrastructure concerns
- **Type Safety**: Full TypeScript support with proper interfaces and types
- **Validation**: Response validation using Elysia's schema validation

## Persistence

The count is persisted to a file (`count.txt`) to maintain state between server restarts.
