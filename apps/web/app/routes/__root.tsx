import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { Toaster } from "~/ui/toaster";
import globalCss from "../global.css?url";
import { DefaultCatchBoundary } from "../views/default-catch-boundary";
import { ModeToggle } from "../views/mode-toggle";
import { MainNavigation } from "../views/navigation";
import { NotFound } from "../views/not-found";
import { ThemeProvider } from "../views/theme-provider";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
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
	beforeLoad: () => {
		// void fetchSessionFn();
		return null;
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<div className="flex min-h-screen flex-col">
				<header>
					<div className="container flex items-center justify-between py-4">
						<h1 className="text-xl font-bold">TanStack App</h1>
						<ModeToggle />
					</div>
					<MainNavigation />
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
				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}
