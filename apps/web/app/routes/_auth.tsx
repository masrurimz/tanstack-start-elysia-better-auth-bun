import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { api } from 'backend-client'

export const Route = createFileRoute('/_auth')({
	component: Home,
	loader: async () => {
		const response = await api.count.index.get()
		return response.data
	},
})

function Home() {
	const router = useRouter()

	return (
		<>
			<div className="container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative flex-col hidden h-full p-10 text-white bg-muted lg:flex dark:border-r">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="w-6 h-6 mr-2"
							aria-label="Acme Inc Logo"
						>
							<title>Acme Inc Logo</title>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
						Acme Inc
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my
								clients faster than ever before.&rdquo;
							</p>
							<footer className="text-sm">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<Outlet />
			</div>
		</>
	)
}
