import { createFileRoute } from '@tanstack/react-router'
import { api } from 'backend-client'
import { useState } from 'react'
import { PokemonSprite } from '../views/pokemon/pokemon-sprite'

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(' ')
}

// Simple mutation hook implementation
function useMutation<TData, TVariables>({
	mutationFn,
	onSuccess,
}: {
	mutationFn: (variables: TVariables) => Promise<TData>
	onSuccess?: (data: TData) => void
}) {
	const [isPending, setIsPending] = useState(false)

	const mutate = async (variables: TVariables) => {
		try {
			setIsPending(true)
			const result = await mutationFn(variables)
			onSuccess?.(result)
			return result
		} finally {
			setIsPending(false)
		}
	}

	return {
		mutate,
		isPending,
	}
}

export const Route = createFileRoute('/pokemon/')({
	loader: async () => {
		const { data } = await api.pokemon.pair.get()
		return { pokemonPair: data?.pair }
	},
	component: VotePage,
})

function VotePage() {
	const { pokemonPair } = Route.useLoaderData()
	const navigate = Route.useNavigate()

	const voteMutation = useMutation({
		mutationFn: async (vote: {
			votedForId: number
			votedAgainstId: number
		}) => {
			const result = await api.pokemon.vote.post(vote)
			return result.data
		},
		onSuccess: () => {
			navigate({ to: '/pokemon' })
		},
	})

	if (!pokemonPair?.[0] || !pokemonPair?.[1]) {
		return <div className="text-2xl font-bold text-red-500">No more Pokemon to vote on!</div>
	}

	const [pokemonOne, pokemonTwo] = pokemonPair
	const isVoting = voteMutation.isPending

	return (
		<div className="flex min-h-[80vh] items-center justify-center gap-16">
			{isVoting ? (
				<VoteFallback />
			) : (
				<>
					{/* Pokemon One */}
					<div className="flex flex-col items-center gap-4">
						<PokemonSprite dexId={pokemonOne.id} className="w-64 h-64" />
						<div className="text-center">
							<span className="text-lg text-gray-500">#{pokemonOne.id}</span>
							<h2 className="text-2xl font-bold capitalize">{pokemonOne.name}</h2>
							<button
								disabled={isVoting}
								onClick={() =>
									voteMutation.mutate({
										votedForId: pokemonOne.id,
										votedAgainstId: pokemonTwo.id,
									})
								}
								className={cn(
									'px-8 py-3 text-lg font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300',
									isVoting && 'opacity-50 cursor-not-allowed',
								)}
							>
								Vote
							</button>
						</div>
					</div>

					{/* Pokemon Two */}
					<div className="flex flex-col items-center gap-4">
						<PokemonSprite dexId={pokemonTwo.id} className="w-64 h-64" />
						<div className="text-center">
							<span className="text-lg text-gray-500">#{pokemonTwo.id}</span>
							<h2 className="text-2xl font-bold capitalize">{pokemonTwo.name}</h2>
							<button
								disabled={isVoting}
								onClick={() =>
									voteMutation.mutate({
										votedForId: pokemonTwo.id,
										votedAgainstId: pokemonOne.id,
									})
								}
								className={cn(
									'px-8 py-3 text-lg font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300',
									isVoting && 'opacity-50 cursor-not-allowed',
								)}
							>
								Vote
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export function VoteFallback() {
	return (
		<>
			{[1, 2].map((i) => (
				<div key={i} className="flex flex-col items-center gap-4">
					<div className="w-64 h-64 rounded-lg animate-pulse bg-gray-800/10" />
					<div className="flex flex-col items-center justify-center text-center space-y-2">
						<div className="w-16 h-6 rounded animate-pulse bg-gray-800/10" />
						<div className="w-32 h-8 rounded animate-pulse bg-gray-800/10" />
						<div className="w-24 h-12 rounded animate-pulse bg-gray-800/10" />
					</div>
				</div>
			))}
		</>
	)
}
