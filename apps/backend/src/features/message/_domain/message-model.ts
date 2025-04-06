import { t } from "elysia";

// Elysia models for validation
export const messageModel = t.Object(
	{
		title: t.String({
			minLength: 1,
			description: "Message title",
		}),
		content: t.String({
			minLength: 1,
			description: "Message content",
		}),
	},
	{
		description: "Message payload",
	},
);

export const messageResponseModel = t.Object(
	{
		id: t.String(),
		title: t.String(),
		content: t.String(),
		userId: t.String(),
		createdAt: t.Date(),
		updatedAt: t.Date(),
		user: t.Object({
			id: t.String(),
			name: t.String(),
			email: t.String(),
			image: t.Optional(t.Nullable(t.String())),
		}),
	},
	{
		description: "Message response with user details",
	},
);
