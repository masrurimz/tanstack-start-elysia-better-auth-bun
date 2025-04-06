import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import {  authService } from "./auth";
import type {auth} from "./auth";
import { countRoutes } from "./count";
import { messageService } from "./message";
import { note } from "./note";
import { pokemonRoutes } from "./pokemon";
import { user } from "./user";

const app = new Elysia()
  .use(cors())
  .use(opentelemetry())
  .use(swagger())
  .onError(({ error, code }) => {
    if (code === "NOT_FOUND") return "Not Found :(";

    console.error(error);
  })
  .use(authService)
  .get("/", ({ path }) => `Hello Elysia from ${path}`)
  .get("health", () => "OK")
  .use(messageService)
  .use(note)
  .use(user)
  .use(countRoutes)
  .use(pokemonRoutes)
  .listen(3001);

export type App = typeof app;
export type Session = typeof auth.$Infer.Session;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
