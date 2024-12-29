import { createFileRoute } from '@tanstack/react-router'
import { Link, Outlet } from '@tanstack/react-router'

const VoteLayout = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col justify-between min-h-screen antialiased text-white border-t-2 border-purple-600 min-w-screen bg-gray-950">
		<header className="px-8 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-baseline">
					<Link href="/pokemon" className="text-3xl font-bold">
						round<span className="text-purple-600">est</span>
						<span className="pl-2 text-2xl text-gray-400 font-extralight">(Remix + Drizzle + Bun Stack Version)</span>
					</Link>
				</div>
				<nav className="flex flex-row items-center gap-8">
					<Link href="/pokemon/results" className="text-lg hover:underline">
						Results
					</Link>
				</nav>
			</div>
		</header>

		<main className="flex-1">{children}</main>

		<footer className="py-3 font-light text-center text-gray-500">
			<a
				href="https://github.com/masrurimz/1app5stacks-remix-elysia-bun-hono-tanstack"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</a>
		</footer>
	</div>
)

export const Route = createFileRoute('/pokemon')({
	component: () => (
		<VoteLayout>
			<Outlet />
		</VoteLayout>
	),
})
