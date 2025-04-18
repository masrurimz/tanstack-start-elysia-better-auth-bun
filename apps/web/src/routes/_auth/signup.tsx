import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, redirect, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { authToast } from "~/libs/sonner-toast";
import {
  authKeys,
  emailSignUpMutationOptions,
  SignUpCredentials,
} from "~/libs/tanstack-query/auth-queries";

const REDIRECT_URL = "/dashboard";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

function SignupPage() {
  const router = useRouter();
  const { queryClient } = Route.useRouteContext();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupMutation = useMutation({
    ...emailSignUpMutationOptions,
    onSuccess: async () => {
      authToast.signUpSuccess();
      await queryClient.invalidateQueries({ queryKey: authKeys.user });
      await router.invalidate();
      router.navigate({ to: REDIRECT_URL });
    },
    onError: (error) => {
      authToast.error(
        error instanceof Error ? error.message : "Failed to create account",
      );
    },
  });

  const onSubmit = (values: SignupValues) => {
    const credentials: SignUpCredentials = {
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL: REDIRECT_URL,
    };

    signupMutation.mutate(credentials);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-6 p-8 w-full max-w-md rounded-xl border bg-card">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="mt-2 text-muted-foreground">Enter your details to sign up</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      disabled={signupMutation.isPending}
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
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      disabled={signupMutation.isPending}
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
                    <Input
                      type="password"
                      placeholder="********"
                      disabled={signupMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      disabled={signupMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {signupMutation.isError && (
              <div className="text-sm font-medium text-destructive">
                {signupMutation.error instanceof Error
                  ? signupMutation.error.message
                  : "An error occurred during signup"}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_auth/signup")({
  component: SignupPage,
  beforeLoad: async ({ context }) => {
    if (context.session?.user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }
  },
});
