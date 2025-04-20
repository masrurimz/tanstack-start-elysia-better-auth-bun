import { edenTreaty } from "@elysiajs/eden";
import type { App, Session } from "backend-client";
import { api } from "backend-client";

// export const api = edenTreaty<App>("http://localhost:3001", {
//   $fetch: {
//     credentials: "include",
//     mode: "cors",
//   },
// });

export { api };

export type { Session };
