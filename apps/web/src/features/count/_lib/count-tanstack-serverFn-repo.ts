import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs";
import type { CountRepository } from "../_domain/count-repository";

// Local file path for counter
const filePath = "count.txt";

// Create the file if it doesn't exist
try {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "0");
	}
} catch (error) {
	console.error("Failed to setup count file:", error);
}

// Define server functions at the top level
export const getCountServerFn = createServerFn({ method: "GET" }).handler(
	() => {
		try {
			return parseInt(fs.readFileSync(filePath, "utf-8") || "0", 10);
		} catch (error) {
			console.error("Failed to read count:", error);
			return 0;
		}
	},
);

export const incrementCountServerFn = createServerFn({
	method: "POST",
}).handler(async () => {
	try {
		const currentCount = await getCountServerFn();
		const newCount = currentCount + 1;
		fs.writeFileSync(filePath, newCount.toString());
		return newCount;
	} catch (error) {
		console.error("Failed to update count:", error);
		return 0;
	}
});

// TanStack Implementation
export class TanStackCountServerFnRepo implements CountRepository {
	getCount = async (): Promise<number> => {
		return getCountServerFn();
	};

	incrementCount = async (): Promise<number> => {
		return incrementCountServerFn();
	};
}

export const tanStackCountRepository = new TanStackCountServerFnRepo();
