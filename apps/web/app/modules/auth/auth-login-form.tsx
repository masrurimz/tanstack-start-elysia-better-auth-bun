import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { authClient } from '~/infra/auth/auth-client'

import { Button } from '~/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/ui/form'
import { Icons } from '~/ui/icons'
import { Input } from '~/ui/input'
import { cn } from '~/ui/utils'

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthLoginForm({ className, ...props }: UserAuthFormProps) {
	// const session = authClient.useSession()

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const loginMutation = useMutation({
		mutationFn: async (data: LoginFormValues) => {
			// Replace with your actual API call
			// const response = await fetch('/api/auth/login', {
			// 	method: 'POST',
			// 	body: JSON.stringify(data),
			// })
			// if (!response.ok) throw new Error('Login failed')
			// return response.json()

			return authClient.signIn.email({
				email: data.email,
				password: data.password,
				rememberMe: true,
			})
		},
	})

	async function onSubmit(data: LoginFormValues) {
		try {
			const res = await loginMutation.mutateAsync(data)

			console.log(res)

			// Getting user session test
			const sessions = await authClient.getSession()
			console.log('[LoginForm] sessions', sessions)

			// Handle successful login (e.g., redirect)
		} catch (error) {
			// Error is handled by React Query
		}
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<div className="grid gap-2">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={loginMutation.isPending}
										placeholder="Enter email"
										autoComplete="username"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										disabled={loginMutation.isPending}
										placeholder="Enter password"
										autoComplete="current-password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button disabled={loginMutation.isPending} onClick={form.handleSubmit(onSubmit)}>
						{loginMutation.isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						Sign In
					</Button>
				</div>
			</Form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<Button variant="outline" disabled={loginMutation.isPending}>
				{loginMutation.isPending ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{' '}
				GitHub
			</Button>
		</div>
	)
}
