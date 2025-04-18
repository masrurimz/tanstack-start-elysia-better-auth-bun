import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "vinxi/http";
import { authClientRepo } from "./auth-client-repo";
// import { authServerRepo } from "./auth-server-repo";

type Session = typeof authClientRepo.$Infer.Session;

const getSessionFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const { headers } = getWebRequest()!;

  // Use this for fetching session from elysia as BE
  const session = await authClientRepo.getSession({
    fetchOptions: {
      headers,
    },
  });
  return session.data || null;

  // const session = await authServerRepo.api.getSession({ headers });
  // return session || null;
});

export { getSessionFn };
export type { Session };
