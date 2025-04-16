import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "vinxi/http";

const getServerHeadersFn = createServerFn().handler(() => {
	return getHeaders();
});

export { getServerHeadersFn };
