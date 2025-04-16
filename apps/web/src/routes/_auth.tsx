import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { authController } from "src/features/auth/_controllers/auth-controller";

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
	beforeLoad: async () => {
		try {
			const session = await authController.getSession();
			if (session.data?.user) {
				redirect({
					to: "/messages",
					throw: true,
				});
			}
		} catch (error) {
			// If we fail to fetch session, continue to auth pages
			if (error instanceof Error && "redirect" in error) {
				throw error;
			}
		}
	},
});

function AuthLayout() {
	return (
		<>
			<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center font-medium text-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6"
							aria-label="Acme Inc Logo"
						>
							<title>Acme Inc Logo</title>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
						Better Auth Demo
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo;This library has saved me countless hours of work and
								helped me deliver stunning designs to my clients faster than
								ever before.&rdquo;
							</p>
							<footer className="text-sm">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<Outlet />
			</div>
		</>
	);
}
