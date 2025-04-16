import { createServerFn } from "@tanstack/start";
import { getHeaders } from "vinxi/http";
import { authClientRepo } from "./auth-client-repo";

type Session = typeof authClientRepo.$Infer.Session;

const getSessionFn = createServerFn().handler(async () => {
	const vinxiHeaders = getHeaders();

	const headers = new Headers();

	if (vinxiHeaders.cookie) {
		headers.set("cookie", vinxiHeaders.cookie);
	}

	const session = await authClientRepo.getSession({
		fetchOptions: {
			headers,
		},
	});

	return session;
});

export { getSessionFn };
export type { Session };
