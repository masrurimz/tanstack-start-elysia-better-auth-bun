import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "backend-client";
import { useEffect, useState } from "react";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/ui/card";

// Type definition for the Elysia response
interface ElysiaCountResponse {
	data: { count: number } | number | null;
}

// Extract Elysia count from response safely
const extractElysiaCount = (response: ElysiaCountResponse): number => {
	if (typeof response.data === "object" && response.data !== null) {
		if ("count" in response.data) {
			return response.data.count;
		}
		return 0;
	}
	return response.data ?? 0;
};

export const Route = createFileRoute("/count/elysia")({
	component: ElysiaCountPage,
});

function ElysiaCountPage() {
	const [count, setCount] = useState(0);
	const [isUpdating, setIsUpdating] = useState(false);

	// Fetch the count from Elysia backend
	const fetchCount = async () => {
		try {
			const response = await api.count.index
				.get()
				.catch(() => ({ data: { count: 0 } }) as ElysiaCountResponse);

			setCount(extractElysiaCount(response));
		} catch (error) {
			console.error("Failed to load count:", error);
		}
	};

	// Load initial count
	useEffect(() => {
		void fetchCount();
	}, []);

	// Handler for incrementing the counter
	const handleIncrement = async () => {
		setIsUpdating(true);
		try {
			// Update server
			await api.count.increment.post();

			// Fetch latest count after update
			await fetchCount();
		} catch (error) {
			console.error("Failed to update count:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	// Refresh count from server
	const handleRefresh = async () => {
		setIsUpdating(true);
		try {
			await fetchCount();
		} catch (error) {
			console.error("Failed to refresh count:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="container py-10 flex flex-col items-center justify-center min-h-[80vh]">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-center">Elysia Backend Counter</CardTitle>
					<CardDescription className="text-center">
						Counter implementation using Elysia backend API
					</CardDescription>
				</CardHeader>

				<CardContent className="pt-6">
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="text-6xl font-bold">{count}</div>
						<p className="text-sm text-muted-foreground">
							Counter stored in Elysia backend
						</p>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col gap-4">
					<Button
						onClick={handleIncrement}
						className="w-full"
						disabled={isUpdating}
					>
						{isUpdating ? "Updating..." : "Increment Count"}
					</Button>

					<div className="flex w-full justify-between">
						<Link to="/count">
							<Button variant="outline">Back to Hub</Button>
						</Link>
						<Button
							variant="ghost"
							onClick={handleRefresh}
							disabled={isUpdating}
						>
							{isUpdating ? "Refreshing..." : "Refresh"}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
