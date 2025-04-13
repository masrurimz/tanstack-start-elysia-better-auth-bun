import type {
	AuthSession,
	LoginFormValues,
	RegisterFormValues,
} from "./auth-model";

export interface AuthRepository {
	login: ({
		email,
		password,
	}: LoginFormValues) => Promise<{ success: boolean }>;
	register: ({
		name,
		email,
		password,
	}: RegisterFormValues) => Promise<{ success: boolean }>;
	githubLogin: () => Promise<{ success: boolean }>;
	getSession: () => Promise<{ session: AuthSession }>;
	logout: () => Promise<{ success: boolean }>;
}
