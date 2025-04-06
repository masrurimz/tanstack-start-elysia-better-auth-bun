import { cn } from "~/ui/utils";
import { PokemonSprite } from "./pokemon-sprite";

interface PokemonCardProps {
	id: number;
	name: string;
	onVote?: () => void;
	isVoting?: boolean;
}

export const PokemonCard = ({
	id,
	name,
	onVote,
	isVoting,
}: PokemonCardProps) => {
	return (
		<div className="flex flex-col items-center gap-4">
			<PokemonSprite dexId={id} className="h-64 w-64" />
			<div className="text-center">
				<span className="text-gray-500 text-lg">#{id}</span>
				<h2 className="font-bold text-2xl capitalize">{name}</h2>
				{onVote && (
					<button
						type="button"
						disabled={isVoting}
						onClick={onVote}
						className={cn(
							"rounded-lg bg-blue-500 px-8 py-3 font-semibold text-lg text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300",
							isVoting && "cursor-not-allowed opacity-50",
						)}
					>
						Vote
					</button>
				)}
			</div>
		</div>
	);
};
