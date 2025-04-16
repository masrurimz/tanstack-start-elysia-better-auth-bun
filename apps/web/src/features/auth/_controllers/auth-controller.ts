/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useToast } from "src/controllers/use-toast";
import { authClientRepo } from "src/libs/better-auth/auth-client-repo";
import { getSessionFn } from "src/libs/better-auth/auth-session";
import type { LoginFormValues, RegisterFormValues } from "../_domain/auth-model";
export class AuthController {
  // Use better-auth's built-in session hook
  useSession = () => authClientRepo.useSession();

  // Login hook
  useLogin = () => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
      mutationFn: async ({ email, password }: LoginFormValues) => {
        return authClientRepo.signIn.email({ email, password });
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: "You have been successfully logged in.",
        });

        // Invalidate router to refresh protected routes
        void router.invalidate();
        void queryClient.invalidateQueries();
      },
      onError: (error) => {
        toast({
          title: "Failed to login",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      },
    });

    return { loginMutation };
  };

  // Register hook
  useRegister = () => {
    const router = useRouter();
    const { toast } = useToast();

    const registerMutation = useMutation({
      mutationFn: async ({ name, email, password }: RegisterFormValues) => {
        return authClientRepo.signUp.email({ name, email, password });
      },
      onSuccess: () => {
        toast({
          title: "Account created successfully",
          variant: "default",
        });
        void router.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Failed to create account",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      },
    });

    return { registerMutation };
  };

  // GitHub login hook
  useGithubLogin = () => {
    const { toast } = useToast();

    const githubLoginMutation = useMutation({
      mutationFn: async () => {
        return authClientRepo.signIn.social({
          provider: "github",
        });
      },
      onSuccess: () => {
        toast({
          title: "GitHub login successful",
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to login with GitHub",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      },
    });

    return { githubLoginMutation };
  };

  // Logout hook
  useLogout = () => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
      mutationFn: async () => {
        return authClientRepo.signOut();
      },
      onSuccess: () => {
        toast({
          title: "Logged out successfully",
        });
        void router.invalidate();
        void queryClient.invalidateQueries();
      },
      onError: (error) => {
        toast({
          title: "Failed to logout",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      },
    });

    return { logoutMutation };
  };

  getSession = async () => {
    const session = await getSessionFn();
    return session;
  };

  // useIsAuthenticated = () => {
  // 	const { data: session, isPending } = this.useSession();
  // 	return !!session?.user && !isPending;
  // };
}

// Export singleton instance
export const authController = new AuthController();
