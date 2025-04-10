// Count response from server
export interface CountResponse {
	count: number;
}

// Type definition for the Elysia response
export interface ElysiaCountResponse {
	data: { count: number } | number | null;
}
