import { createServerFn } from "@tanstack/start";
import { getHeaders } from "vinxi/http";

const getServerHeadersFn = createServerFn().handler(() => {
	return getHeaders();
});

export { getServerHeadersFn };
