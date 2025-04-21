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
	},
	{
		description: "Message response",
	},
);

export const messageUpdateModel = t.Object(
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
		description: "Message update payload",
	},
);

export const messageIdParam = t.Object(
	{
		id: t.String({
			description: "Message ID",
		}),
	},
	{
		description: "Message ID parameter",
	},
);
