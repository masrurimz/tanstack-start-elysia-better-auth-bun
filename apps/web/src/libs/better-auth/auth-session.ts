import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "vinxi/http";
import { authClientRepo } from "./auth-client-repo";

type Session = typeof authClientRepo.$Infer.Session;

const getSessionFn = createServerFn().handler(async () => {
  const { headers } = getWebRequest()!;

  const session = await authClientRepo.getSession({
    fetchOptions: {
      headers,
    },
  });

  return session || null;
});

export { getSessionFn };
export type { Session };
