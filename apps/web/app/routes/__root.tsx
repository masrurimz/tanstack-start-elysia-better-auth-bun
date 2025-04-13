import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Link,
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
	useNavigate,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { getSessionFn } from "~/libs/better-auth/auth-session";
import { buttonVariants } from "~/ui/button";
import { Toaster } from "~/ui/toaster";
import { cn } from "~/ui/utils";
import { useToast } from "../controllers/use-toast";
import { authController } from "../features/auth/_controllers/auth-controller";
import globalCss from "../global.css?url";
import { DefaultCatchBoundary } from "../views/default-catch-boundary";
import { NotFound } from "../views/not-found";
import { ThemeProvider } from "../views/theme-provider";
interface RouterContext {
	queryClient: QueryClient;
	// getSession: () => ReturnType<typeof getSessionFn>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [{ rel: "stylesheet", href: globalCss }],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	// beforeLoad: async ({ context }) => {
	// 	const queryClient = context.queryClient;

	// 	// Define the queries you want to prefetch here
	// 	// Prefetch and set in response to make the data available on the client
	// 	// This ensures the data is available on first render
	// 	// Allow prefetching any queries that we need available immediately during SSR
	// 	// await queryClient.prefetchQuery(...)
	// },
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
	loader: async () => {
		const session = await getSessionFn();
		return {
			user: session.data?.user,
			isAuthenticated: Boolean(session.data?.user),
		};
	},
});

function RootComponent() {
	const { user, isAuthenticated } = Route.useLoaderData();
	const { logoutMutation } = authController.useLogout();
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogout = () => {
		logoutMutation.mutate(undefined, {
			onSuccess: () => {
				toast({
					title: "Logged out successfully",
				});
				void navigate({ to: "/login" });
			},
		});
	};

	return (
		<RootDocument>
			<div className="flex min-h-screen flex-col">
				<header className="sticky top-0 z-10 w-full bg-background/95 shadow-sm">
					<div className="container flex h-14 items-center">
						<div className="flex flex-1 items-center justify-between">
							<nav className="flex items-center space-x-6 text-sm font-medium">
								<Link to="/" className="font-bold">
									BetterAuth Demo
								</Link>
								<Link
									to="/count"
									activeProps={{
										className: "font-bold",
									}}
									activeOptions={{ exact: false }}
								>
									Count
								</Link>
								<Link
									to="/pokemon"
									activeProps={{
										className: "font-bold",
									}}
									activeOptions={{ exact: false }}
								>
									Pokemon
								</Link>
								{isAuthenticated && (
									<Link
										to="/messages"
										activeProps={{
											className: "font-bold",
										}}
										activeOptions={{ exact: false }}
									>
										Messages
									</Link>
								)}
							</nav>
							{!isAuthenticated && (
								<div className="flex space-x-2">
									<Link
										to="/login"
										className={cn(
											buttonVariants({
												variant: "secondary",
												size: "sm",
											}),
										)}
										activeProps={{
											className: "font-bold",
										}}
									>
										Login
									</Link>

									<Link
										to="/register"
										className={cn(
											buttonVariants({
												variant: "default",
												size: "sm",
											}),
										)}
										activeProps={{
											className: "font-bold",
										}}
									>
										Register
									</Link>
								</div>
							)}

							{isAuthenticated && (
								<div className="flex items-center space-x-4">
									<span>Welcome, {user?.name || user?.email}</span>
									<button
										onClick={handleLogout}
										className={cn(
											buttonVariants({
												variant: "destructive",
												size: "sm",
											}),
										)}
									>
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				</header>
				<main className="flex-1">
					<Outlet />
				</main>
				<footer className="border-t py-4">
					<div className="container text-center text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} TanStack Application
					</div>
				</footer>
			</div>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<Meta />
			</head>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
				<ScrollRestoration />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}
