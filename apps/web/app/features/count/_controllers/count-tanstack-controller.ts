/* eslint-disable react-hooks/rules-of-hooks */
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { countService } from "../_services/count-service";

class CountTanStackController {
	// State atoms
	private countAtom = atom(0);
	private loadingAtom = atom(false);

	// Route loader method
	getCount = async () => {
		return countService.getTanStackCount();
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
		const isLoading = this.useIsLoading();
		const setIsLoading = this.useSetIsLoading();

		return useCallback(async () => {
			if (isLoading) return;

			setIsLoading(true);
			try {
				const currentCount = await countService.getTanStackCount();
				setCount(currentCount);
				return currentCount;
			} catch (error) {
				console.error("Failed to fetch count:", error);
				return null;
			} finally {
				setIsLoading(false);
			}
		}, [isLoading, setCount, setIsLoading]);
	};

	useIncrementCount = () => {
		const isLoading = this.useIsLoading();
		const setIsLoading = this.useSetIsLoading();
		const setCount = this.useSetCount();

		return useCallback(async () => {
			if (isLoading) return;

			setIsLoading(true);
			try {
				const newCount = await countService.incrementTanStackCount();

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

		useEffect(() => {
			if (initialCount !== undefined) {
				setCount(initialCount);
			} else {
				void countService.getTanStackCount();
			}
		}, [initialCount, setCount]);
	};
}

export const countTanStackController = new CountTanStackController();
