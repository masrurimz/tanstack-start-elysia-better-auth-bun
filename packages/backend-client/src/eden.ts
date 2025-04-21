import { edenTreaty } from "@elysiajs/eden";
import type { App, Session } from "@acme/api";

export const api = edenTreaty<App>("http://localhost:3001", {
	$fetch: {
		credentials: "include",
		mode: "cors",
	},
}) as ReturnType<typeof edenTreaty<App>>;

export type { Session };
