import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import type * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useToast } from '~/controllers/use-toast'
import { authClient } from '~/infra/auth/auth-client'
import { Button } from '~/ui/button'
import { Form, FormControl, FormField, FormInput, FormInputHidable, FormItem, FormLabel, FormMessage } from '~/ui/form'
import { Icons } from '~/ui/icons'
import { cn } from '~/ui/utils'

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthLoginForm({ className, ...props }: UserAuthFormProps) {
	const router = useRouter()
	const { toast } = useToast()

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const loginMutation = useMutation({
		mutationFn: async (data: LoginFormValues) => {
			return authClient.signIn.email(
				{
					email: data.email,
					password: data.password,
					rememberMe: true,
				},
				{
					onSuccess: () => {
						toast({
							title: 'Success',
							description: 'You have been successfully logged in.',
						})
						router.invalidate()
					},
					onError: (error) => {
						toast({
							title: 'Failed to login',
							description: error ? error.error.message : 'An error occurred',
							variant: 'destructive',
						})
					},
				},
			)
		},
	})

	async function onSubmit(data: LoginFormValues) {
		await loginMutation.mutateAsync(data)
	}

	const handleGithubLogin = async () => {
		try {
			// Implement GitHub login logic here
			throw new Error('Not implemented')
		} catch (error) {
			toast({
				title: 'Error',
				description: error instanceof Error ? error.message : 'Failed to login with GitHub',
				variant: 'destructive',
			})
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
									<FormInput
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
									<FormInputHidable
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
			<Button variant="outline" onClick={handleGithubLogin} disabled={loginMutation.isPending}>
				{loginMutation.isPending ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}
				GitHub
			</Button>
		</div>
	)
}
