import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/components/ui/utils";
import { AuthRegisterForm } from "~/features/auth/_components/auth-register-form";
import { authController } from "~/features/auth/_controllers/auth-controller";

export const Route = createFileRoute("/_auth/register")({
	component: RouteComponent,
	beforeLoad: async () => {
		try {
			const session = await authController.getSession();
			if (session.data?.user) {
				redirect({
					to: "/",
				});
			}
		} catch (error) {
			// If we fail to fetch session, continue to register page
			if (error instanceof Error && "redirect" in error) {
				throw error;
			}
		}
	},
});

function RouteComponent() {
	return (
		<>
			<Link
				href="/login"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-4 right-4 md:top-8 md:right-8",
				)}
			>
				Login
			</Link>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Create an account
						</h1>
						<p className="text-muted-foreground text-sm">
							Enter your information below to create your account
						</p>
					</div>
					<AuthRegisterForm />
					<p className="px-8 text-center text-muted-foreground text-sm">
						Already have an account?{" "}
						<Link
							href="/login"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
