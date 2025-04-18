import type { MutationOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { authClientRepo } from "~/libs/better-auth/auth-client-repo";

// Query keys
export const authKeys = {
  user: ["user"] as const,
  session: ["session"] as const,
};

// Types
export type SignInCredentials = {
  email: string;
  password: string;
  callbackURL?: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  name: string;
  callbackURL?: string;
};

export type SocialSignInCredentials = {
  provider: "discord" | "google" | "github";
  callbackURL?: string;
};

// Query options
export const userQueryOptions = queryOptions({
  queryKey: authKeys.user,
  queryFn: () => authClientRepo.getSession(),
});

// Mutation options
export const emailSignInMutationOptions: MutationOptions<
  unknown,
  Error,
  SignInCredentials
> = {
  mutationKey: [...authKeys.user, "signin"],
  mutationFn: async (credentials: SignInCredentials) => {
    const res = await authClientRepo.signIn.email(credentials);

    if (res.error) {
      throw new Error(res.error.message);
    }

    return res;
  },
};

export const emailSignUpMutationOptions: MutationOptions<
  unknown,
  Error,
  SignUpCredentials
> = {
  mutationKey: [...authKeys.user, "signup"],
  mutationFn: async (credentials: SignUpCredentials) => {
    return authClientRepo.signUp.email(credentials);
  },
};

export const socialSignInMutationOptions: MutationOptions<
  unknown,
  Error,
  SocialSignInCredentials
> = {
  mutationKey: [...authKeys.user, "social-signin"],
  mutationFn: async (credentials: SocialSignInCredentials) => {
    return authClientRepo.signIn.social({
      provider: credentials.provider,
      callbackURL: credentials.callbackURL,
    });
  },
};

export const signOutMutationOptions: MutationOptions<unknown, Error, void> = {
  mutationKey: [...authKeys.user, "signout"],
  mutationFn: async () => {
    return authClientRepo.signOut();
  },
};
