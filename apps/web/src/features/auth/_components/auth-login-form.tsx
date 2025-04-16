import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormInputHidable,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Icons } from "~/components/ui/icons";
import { cn } from "~/components/ui/utils";
import { authController } from "../_controllers/auth-controller";
import type { LoginFormValues } from "../_domain/auth-model";
import { loginSchema } from "../_domain/auth-model";

type AuthLoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export const AuthLoginForm = ({ className, ...props }: AuthLoginFormProps) => {
  const { loginMutation } = authController.useLogin();
  const { githubLoginMutation } = authController.useGithubLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: LoginFormValues) => {
    loginMutation.mutate({ email, password });
  };

  const handleGithubLogin = () => {
    githubLoginMutation.mutate();
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
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

          <Button
            disabled={loginMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loginMutation.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
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
        onClick={handleGithubLogin}
        disabled={loginMutation.isPending || githubLoginMutation.isPending}
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
