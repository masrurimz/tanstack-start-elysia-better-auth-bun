/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { pokemonService } from "../_services/pokemon-service";

class PokemonController {
	getPokemonPair = async () => {
		return pokemonService.getPokemonPair();
	};

	usePokemonVoteMutation = () => {
		const [isPending, setIsPending] = useState(false);
		const navigate = useNavigate();

		const mutate = async (vote: {
			votedForId: number;
			votedAgainstId: number;
		}) => {
			try {
				setIsPending(true);
				await pokemonService.voteForPokemon(vote);
				void navigate({ to: "/pokemon" });
				return true;
			} finally {
				setIsPending(false);
			}
		};

		return {
			mutate,
			isPending,
		};
	};

	getPokemonResults = async () => {
		return pokemonService.getPokemonResults();
	};
}

export const pokemonController = new PokemonController();
