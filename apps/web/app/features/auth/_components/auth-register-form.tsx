import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormInput,
	FormInputHidable,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../ui/form";
import { Icons } from "../../../ui/icons";
import { cn } from "../../../ui/utils";
import { authController } from "../_controllers/auth-controller";
import type { RegisterFormValues } from "../_domain/auth-model";
import { registerSchema } from "../_domain/auth-model";

type AuthRegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

export const AuthRegisterForm = ({
	className,
	...props
}: AuthRegisterFormProps) => {
	const { registerMutation } = authController.useRegister();
	const { githubLoginMutation } = authController.useGithubLogin();

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = ({ name, email, password }: RegisterFormValues) => {
		registerMutation.mutate({ name, email, password });
	};

	const handleGithubLogin = () => {
		githubLoginMutation.mutate();
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
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
										disabled={registerMutation.isPending}
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
										disabled={registerMutation.isPending}
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
										disabled={registerMutation.isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={registerMutation.isPending}>
						{registerMutation.isPending && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Create Account
					</Button>
				</form>
			</Form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button
				variant="outline"
				type="button"
				disabled={registerMutation.isPending || githubLoginMutation.isPending}
				onClick={handleGithubLogin}
			>
				{githubLoginMutation.isPending ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}
				GitHub
			</Button>
		</div>
	);
};
