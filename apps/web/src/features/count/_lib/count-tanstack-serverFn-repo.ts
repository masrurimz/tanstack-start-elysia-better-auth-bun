import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs";
import type { CountRepository } from "../_domain/count-repository";

// Local file path for counter
const filePath = "count.txt";

// Define server functions at the top level
export const getCountServerFn = createServerFn({ method: "GET" }).handler(
  ({ signal }: { signal?: AbortSignal }) => {
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "0");
      }

      const count = parseInt(fs.readFileSync(filePath, "utf-8") || "0", 10);
      return { count };
    } catch (error) {
      console.error("Failed to read count:", error);
      return { count: 0 };
    }
  },
);

export const incrementCountServerFn = createServerFn({
  method: "POST",
}).handler(async () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "0");
    }

    const { count: currentCount } = await getCountServerFn({ signal: undefined });
    const count = currentCount + 1;
    fs.writeFileSync(filePath, count.toString());
    return { count };
  } catch (error) {
    console.error("Failed to update count:", error);
    return { count: 0 };
  }
});

// TanStack Implementation
export class TanStackCountServerFnRepo implements CountRepository {
  getCount = async ({ signal }: { signal?: AbortSignal }): Promise<{ count: number }> => {
    return getCountServerFn({ signal });
  };

  incrementCount = async (): Promise<{ count: number }> => {
    return incrementCountServerFn();
  };
}

export const tanStackCountRepository = new TanStackCountServerFnRepo();
