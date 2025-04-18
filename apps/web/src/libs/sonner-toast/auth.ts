import { toast } from "sonner";

/**
 * Toast notification utilities for auth-related actions
 */
export const authToast = {
  /**
   * Display a success toast for sign-in
   */
  signInSuccess: () => {
    toast.success("Successfully signed in", {
      description: "Welcome back!",
      duration: 4000,
    });
  },

  /**
   * Display a success toast for sign-up
   */
  signUpSuccess: () => {
    toast.success("Account created successfully", {
      description: "Welcome to our platform!",
      duration: 5000,
    });
  },

  /**
   * Display an error toast for auth-related errors
   */
  error: (message: string) => {
    toast.error("Authentication error", {
      description: message || "Something went wrong. Please try again.",
      duration: 5000,
    });
  },

  /**
   * Display a success toast for sign-out
   */
  signOutSuccess: () => {
    toast.success("Successfully signed out", {
      duration: 3000,
    });
  },

  /**
   * Display a loading toast for auth operations
   */
  loading: (message: string) => {
    return toast.loading(message, {
      duration: 0, // Stays until dismissed
    });
  },

  /**
   * Display a toast for email verification
   */
  verificationEmailSent: (email: string) => {
    toast.success("Verification email sent", {
      description: `Please check ${email} to verify your account.`,
      duration: 8000,
    });
  },
};
