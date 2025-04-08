import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import fs from "node:fs";
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

// Local file path for counter
const filePath = "count.txt";

// Create the file if it doesn't exist
try {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "0");
	}
} catch (error) {
	console.error("Failed to setup count file:", error);
}

// Server function to read the count
export const getCount = createServerFn({ method: "GET" }).handler(() => {
	try {
		return parseInt(fs.readFileSync(filePath, "utf-8") || "0", 10);
	} catch (error) {
		console.error("Failed to read count:", error);
		return 0;
	}
});

// Server function to increment the count
export const incrementCount = createServerFn({ method: "POST" }).handler(
	async () => {
		try {
			const currentCount = await getCount();
			const newCount = currentCount + 1;
			fs.writeFileSync(filePath, newCount.toString());
			return newCount;
		} catch (error) {
			console.error("Failed to update count:", error);
			return 0;
		}
	},
);

export const Route = createFileRoute("/count/tanstack")({
	component: TanstackCountPage,
});

function TanstackCountPage() {
	const [count, setCount] = useState(0);
	const [isUpdating, setIsUpdating] = useState(false);

	// Load initial count
	useEffect(() => {
		void getCount().then(setCount);
	}, []);

	// Handler for incrementing the counter
	const handleIncrement = async () => {
		setIsUpdating(true);
		try {
			await incrementCount();
			const newCount = await getCount();
			setCount(newCount);
		} catch (error) {
			console.error("Failed to update count:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	// Refresh count from file
	const handleRefresh = async () => {
		setIsUpdating(true);
		try {
			const currentCount = await getCount();
			setCount(currentCount);
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
					<CardTitle className="text-center">TanStack Start Counter</CardTitle>
					<CardDescription className="text-center">
						Counter implementation using TanStack Start's server functions
					</CardDescription>
				</CardHeader>

				<CardContent className="pt-6">
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="text-6xl font-bold">{count}</div>
						<p className="text-sm text-muted-foreground">
							Counter stored in local file using TanStack Start
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
