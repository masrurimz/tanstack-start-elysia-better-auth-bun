import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLoginForm } from "~/features/auth/_components/auth-login-form";
import { authController } from "~/features/auth/_controllers/auth-controller";
import { buttonVariants } from "~/ui/button";
import { cn } from "~/ui/utils";

// Create a custom error class for redirects
class RedirectError extends Error {
	readonly to: string;

	constructor(to: string) {
		super(`Redirect to ${to}`);
		this.name = "RedirectError";
		this.to = to;
	}
}

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
	beforeLoad: async () => {
		try {
			const session = await authController.getSession();
			if (session.data?.user) {
				return redirect({ to: "/" });
			}
		} catch (error) {
			// If error is a RedirectError, process the redirect
			if (error instanceof RedirectError) {
				return redirect({ to: error.to });
			}
			// Otherwise, just log it and continue
			console.error("Error in beforeLoad:", error);
		}
		return {};
	},
});

function RouteComponent() {
	return (
		<>
			<Link
				href="/register"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-4 right-4 md:top-8 md:right-8",
				)}
			>
				Register
			</Link>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Welcome back
						</h1>
						<p className="text-muted-foreground text-sm">
							Sign in to your account
						</p>
					</div>
					<AuthLoginForm />
					<p className="px-8 text-center text-muted-foreground text-sm">
						Don't have an account?{" "}
						<Link
							href="/register"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
