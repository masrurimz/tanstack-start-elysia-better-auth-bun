/* eslint-disable react-hooks/rules-of-hooks */
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { countService } from "../_services/count-service";

class CountElysiaController {
	// State atoms
	private countAtom = atom(0);
	private loadingAtom = atom(false);

	// Route loader method
	getCount = async () => {
		return countService.getElysiaCount();
	};

	// Individual state hooks with single responsibility
	useCountValue = () => {
		return useAtomValue(this.countAtom);
	};

	useSetCount = () => {
		return useSetAtom(this.countAtom);
	};

	useIsLoading = () => {
		return useAtomValue(this.loadingAtom);
	};

	useSetIsLoading = () => {
		return useSetAtom(this.loadingAtom);
	};

	// Action hooks with single responsibility
	useFetchCount = () => {
		const setCount = this.useSetCount();
		const setIsLoading = this.useSetIsLoading();

		return useCallback(async () => {
			console.log("useFetchCount.fetching");

			setIsLoading(true);
			try {
				const currentCount = await countService.getElysiaCount();
				setCount(currentCount);
				return currentCount;
			} catch (error) {
				console.error("Failed to fetch count:", error);
				return null;
			} finally {
				setIsLoading(false);
			}
		}, [setCount, setIsLoading]);
	};

	useIncrementCount = () => {
		const isLoading = this.useIsLoading();
		const setIsLoading = this.useSetIsLoading();
		const setCount = this.useSetCount();

		return useCallback(async () => {
			console.log("useIncrementCount.incrementing");

			if (isLoading) return;

			setIsLoading(true);
			try {
				await countService.incrementElysiaCount();

				const newCount = await countService.getElysiaCount();

				setCount(newCount);
			} catch (error) {
				console.error("Failed to increment count:", error);
			} finally {
				setIsLoading(false);
			}
		}, [isLoading, setIsLoading, setCount]);
	};

	// Initialization hook - separate to prevent unnecessary re-renders
	useInitializeCount = (initialCount?: number) => {
		const setCount = this.useSetCount();
		const fetchCount = this.useFetchCount();

		useEffect(() => {
			if (initialCount !== undefined) {
				console.log("useInitializeCount.initializing", initialCount);
				setCount(initialCount);
			} else {
				console.log("useInitializeCount.fetching");
				// void fetchCount();
			}
		}, [initialCount, setCount, fetchCount]);

		// Empty return since the useEffect is now inside the controller
		return null;
	};
}

export const countElysiaController = new CountElysiaController();
