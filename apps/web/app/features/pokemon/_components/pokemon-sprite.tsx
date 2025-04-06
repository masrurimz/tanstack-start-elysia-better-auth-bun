interface PokemonSpriteProps {
	dexId: number;
	className?: string;
}

export const PokemonSprite = ({ dexId, className }: PokemonSpriteProps) => {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`}
			className={className}
			style={{ imageRendering: "pixelated" }}
			alt={`Pokemon #${dexId}`}
		/>
	);
};
