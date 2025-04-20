import { countRepository } from "./_lib/count-file-repository";

class CountService {
	getCount = () => {
		return {
			count: countRepository.getCount(),
		};
	};

	increment = async () => {
		const newCount = await countRepository.increment();
		return {
			success: true,
			message: "Count incremented successfully",
			count: newCount,
		};
	};
}

export const countService = new CountService();
