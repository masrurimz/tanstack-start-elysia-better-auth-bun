import { edenTreaty } from "@elysiajs/eden";
import type {
	App as ElysiaBackendApp,
	Session,
} from "../../../apps/backend/src";

export const api = edenTreaty<ElysiaBackendApp>("http://localhost:3001", {
	$fetch: {
		credentials: "include",
		mode: "cors",
	},
}) as ReturnType<typeof edenTreaty<ElysiaBackendApp>>;

export type { Session, ElysiaBackendApp };
