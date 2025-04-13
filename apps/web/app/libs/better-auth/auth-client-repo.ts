import { createAuthClient } from "better-auth/react";

const authClientRepo = createAuthClient({
	baseURL: "http://localhost:3001",
});

export { authClientRepo };
