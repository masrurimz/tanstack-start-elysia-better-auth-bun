import { Elysia } from "elysia";

const FILE_PATH = "./count.txt";

// Initialize count from file or default to 0
let count = Number.parseInt(
  await Bun.file(FILE_PATH)
    .text()
    .catch(() => "0"),
);

// Helper function to persist count
async function saveCount() {
  await Bun.write(FILE_PATH, count.toString());
}

export const countRoutes = new Elysia({ prefix: "/count" })
  .get("/index", () => count)
  .post("/increment", async () => {
    count += 1;
    await saveCount();
    return count;
  });
