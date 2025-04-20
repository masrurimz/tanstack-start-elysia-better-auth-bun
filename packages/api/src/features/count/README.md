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

**Response:**

```json
{
	"count": 42
}
```

### 2. Increment Count

```
POST /count/increment
```

Increments the count by 1 and returns the new value.

**Response:**

```json
{
	"success": true,
	"message": "Count incremented successfully",
	"count": 42
}
```

## Implementation Details

### Controller Pattern

Uses Elysia instances as controllers with method chaining:

```typescript
export const count = new Elysia({
  prefix: "/count",
})
  .decorate("countService", countService)
  .model({
    countResponse: countResponseModel,
    countIncrementResponse: countIncrementResponseModel,
  })
  .get("/", ...)
  .post("/increment", ...);
```

### Service Pattern

Uses class-based services with arrow function methods:

```typescript
class CountService {
	getCount = () => {
		return {
			count: countRepository.getCount(),
		};
	};

	increment = async () => {
		const newCount = await countRepository.increment();
		return {
			success: true,
			message: "Count incremented successfully",
			count: newCount,
		};
	};
}
```

### Repository Pattern

Uses repository pattern with domain interfaces and file-based implementation:

```typescript
// Domain interface
export interface CountRepository {
	getCount: () => number;
	increment: () => Promise<number>;
}

// Implementation in _lib
class CountFileRepository implements CountRepository {
	// ...implementation
}
```

## Persistence

The count is persisted to a file (`count.txt`) to maintain state between server restarts. The file-based repository handles reading and writing to this file.
