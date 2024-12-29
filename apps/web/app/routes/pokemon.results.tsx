import { Await, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { api } from 'backend-client'
import { PokemonSprite } from '~/app/components/pokemon/pokemon-sprite'

export const Route = createFileRoute('/pokemon/results')({
	loader: async () => {
		const voteResult = api.pokemon.results.get()
		return {
			voteResult,
		}
	},
	component: ResultsPage,
	head: () => ({
		meta: [
			{
				title: 'Results (Tanstack Start + Drizzle + Bun Stack Version)',
			},
		],
	}),
})

function ResultsPage() {
	const { voteResult } = Route.useLoaderData()

	return (
		<div className="container px-4 py-8 mx-auto text-white">
			<div className="grid gap-4">
				<Await promise={voteResult} fallback={<ResultsFallback />}>
					{(results) => <Content data={results.data} />}
				</Await>
				{/* {results?.length ? <ResultsFallback /> : <Content />} */}
			</div>
		</div>
	)
}

function Content({
	data: results,
}: {
	data: Awaited<ReturnType<typeof api.pokemon.results.get>>['data']
}) {
	return (
		<>
			{results?.map((pokemon, index) => (
				<div
					key={pokemon.dexId}
					className="flex items-center gap-6 p-6 transition-shadow rounded-lg shadow bg-gray-800/40 hover:shadow-md"
				>
					<div className="w-8 text-2xl font-bold text-gray-400">#{index + 1}</div>
					<PokemonSprite dexId={pokemon.dexId} className="w-20 h-20" />
					<div className="flex-grow">
						<div className="text-sm text-gray-400">#{pokemon.dexId}</div>
						<h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-blue-400">{pokemon.winPercentage.toFixed(1)}%</div>
						<div className="text-sm text-gray-400">
							{pokemon.upVotes}W - {pokemon.downVotes}L
						</div>
					</div>
				</div>
			))}
		</>
	)
}

function ResultsFallback() {
	return (
		<>
			{[...Array(10)].map((_, i) => (
				<div key={i} className="flex items-center gap-6 p-6 rounded-lg shadow animate-pulse bg-gray-800/40">
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
	)
}
