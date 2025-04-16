/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "@tanstack/react-router";
import { atom, useAtomValue, useSetAtom } from "jotai";
import type {
	PokemonPair,
	PokemonResult,
	PokemonVoteParams,
} from "../_domain/pokemon-model";
import { pokemonService } from "../_services/pokemon-service";

// Atoms
const isPendingVoteAtom = atom(false);

class PokemonController {
	// Data fetchers
	getPokemonPair = async (): Promise<{ pokemonPair: PokemonPair }> => {
		const pokemonPair = await pokemonService.getPokemonPair();
		return { pokemonPair };
	};

	getPokemonResults = async (): Promise<{ results: PokemonResult[] }> => {
		const results = await pokemonService.getPokemonResults();
		return { results };
	};

	// Hooks for reading state
	useIsPendingVote = () => {
		const isPending = useAtomValue(isPendingVoteAtom);
		return { isPending };
	};

	// Hooks for writing state
	useVoteForPokemon = () => {
		const router = useRouter();
		const setIsPending = useSetAtom(isPendingVoteAtom);

		const voteForPokemon = async ({
			votedForId,
			votedAgainstId,
		}: PokemonVoteParams): Promise<{ success: boolean }> => {
			try {
				setIsPending(true);
				await pokemonService.voteForPokemon({ votedForId, votedAgainstId });
				await router.invalidate();
				return { success: true };
			} finally {
				setIsPending(false);
			}
		};

		return { voteForPokemon };
	};
}

export const pokemonController = new PokemonController();
