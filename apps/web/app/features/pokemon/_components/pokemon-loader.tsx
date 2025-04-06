export const PokemonLoader = () => {
	return (
		<>
			{[1, 2].map((i) => (
				<div key={i} className="flex flex-col items-center gap-4">
					<div className="h-64 w-64 animate-pulse rounded-lg bg-gray-800/10" />
					<div className="flex flex-col items-center justify-center space-y-2 text-center">
						<div className="h-6 w-16 animate-pulse rounded bg-gray-800/10" />
						<div className="h-8 w-32 animate-pulse rounded bg-gray-800/10" />
						<div className="h-12 w-24 animate-pulse rounded bg-gray-800/10" />
					</div>
				</div>
			))}
		</>
	);
};

export const ResultsLoader = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<div
					key={i}
					className="flex items-center p-6 rounded-lg shadow gap-6 animate-pulse bg-gray-800/40"
				>
					<div className="w-8 h-8 rounded bg-gray-700/40" />
					<div className="w-20 h-20 rounded bg-gray-700/40" />
					<div className="flex-grow">
						<div className="w-16 h-4 mb-2 rounded bg-gray-700/40" />
						<div className="w-32 h-6 rounded bg-gray-700/40" />
					</div>
					<div className="text-right">
						<div className="w-16 h-8 mb-2 rounded bg-gray-700/40" />
						<div className="w-24 h-4 rounded bg-gray-700/40" />
					</div>
				</div>
			))}
		</>
	);
};
