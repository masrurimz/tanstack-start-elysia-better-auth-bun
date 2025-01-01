import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useToast } from '~/controllers/use-toast'
import { authClient } from '~/infra/auth/auth-client'
import { Button } from '~/ui/button'
import { Form, FormControl, FormField, FormInput, FormInputHidable, FormItem, FormLabel, FormMessage } from '~/ui/form'
import { Icons } from '~/ui/icons'
import { cn } from '~/ui/utils'

const formSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type FormValues = z.infer<typeof formSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
	const { toast } = useToast()
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const signUpMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			return authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: values.name,
			})
		},
		onSuccess: () => {
			toast({
				title: 'Account created successfully',
				variant: 'default',
			})
			form.reset()
		},
		onError: (error) => {
			toast({
				title: error instanceof Error ? error.message : 'Failed to create account',
				variant: 'destructive',
			})
		},
	})

	async function onSubmit(values: FormValues) {
		signUpMutation.mutate(values)
	}

	const handleGithubRegister = async () => {
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
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<FormInput
										placeholder="John Doe"
										type="text"
										autoCapitalize="words"
										autoComplete="name"
										disabled={signUpMutation.isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<FormInput
										placeholder="name@example.com"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										disabled={signUpMutation.isPending}
										{...field}
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
										type="password"
										autoCapitalize="none"
										autoComplete="new-password"
										disabled={signUpMutation.isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={signUpMutation.isPending}>
						{signUpMutation.isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						Create Account
					</Button>
				</form>
			</Form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={signUpMutation.isPending} onClick={handleGithubRegister}>
				{signUpMutation.isPending ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{' '}
				GitHub
			</Button>
		</div>
	)
}
