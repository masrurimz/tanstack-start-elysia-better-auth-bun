import { app } from "@acme/api";

app.listen(3001);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
	`📚 Swagger documentation available at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
