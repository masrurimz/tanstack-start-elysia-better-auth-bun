import * as z from "zod";

// Login form schema
export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Register form schema
export const registerSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Auth session type
export interface AuthSession {
	user: {
		id: string;
		email: string;
		name?: string;
	} | null;
}
