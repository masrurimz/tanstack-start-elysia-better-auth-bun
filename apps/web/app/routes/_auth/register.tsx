import { Link, createFileRoute } from '@tanstack/react-router'
import { buttonVariants } from '~/ui/button'
import { cn } from '~/ui/utils'
import { UserAuthForm } from '~/views/auth/auth-register-form'

export const Route = createFileRoute('/_auth/register')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Link
				href="/login"
				className={cn(buttonVariants({ variant: 'ghost' }), 'absolute top-4 right-4 md:top-8 md:right-8')}
			>
				Login
			</Link>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">Create an account</h1>
						<p className="text-muted-foreground text-sm">Enter your email below to create your account</p>
					</div>
					<UserAuthForm />
					<p className="px-8 text-center text-muted-foreground text-sm">
						By clicking continue, you agree to our{' '}
						<Link href="/terms" className="underline underline-offset-4 hover:text-primary">
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</>
	)
}
