/* eslint-disable react-hooks/rules-of-hooks */
import { queryClient } from "~/libs/tanstack-query/query-client";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type {
  Message,
  MessageCreateParams,
  MessageUpdateParams,
} from "../_domain/message-model";
import {
  messageKeys,
  messagesQueryOptions,
  messageQueryOptions,
  createMessageMutation,
  updateMessageMutation,
  deleteMessageMutation,
} from "../_libs/message-query";

class MessageController {
  // Route loader methods for tanstack router
  getMessages = async () => {
    return queryClient.ensureQueryData(messagesQueryOptions());
  };

  getMessage = async ({ id }: { id: string }) => {
    try {
      return queryClient.ensureQueryData(messageQueryOptions({ id }));
    } catch (error) {
      return { message: null, error: "Failed to fetch message" };
    }
  };

  // Query hooks
  useMessagesQuery = () => {
    return { data: useSuspenseQuery(messagesQueryOptions()).data };
  };

  useMessageQuery = ({ id }: { id: string }) => {
    return { data: useSuspenseQuery(messageQueryOptions({ id })).data };
  };

  // Form state hooks
  useMessageForm = (initialMessage?: Partial<Message>) => {
    const [title, setTitle] = useState(initialMessage?.title || "");
    const [content, setContent] = useState(initialMessage?.content || "");

    const resetForm = useCallback(() => {
      setTitle("");
      setContent("");
    }, []);

    return {
      formValues: { title, content },
      setTitle,
      setContent,
      resetForm,
      isValid: title.trim().length > 0 && content.trim().length > 0,
    };
  };

  // Mutation hooks
  useCreateMessageMutation = () => {
    return useMutation({
      mutationFn: createMessageMutation,
      onSuccess: () => {
        toast.success("Message created successfully");
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
      },
      onError: (error) => {
        console.error("Failed to create message:", error);
        toast.error("Failed to create message");
      },
    });
  };

  useUpdateMessageMutation = () => {
    return useMutation({
      mutationFn: updateMessageMutation,
      onSuccess: (_, variables) => {
        toast.success("Message updated successfully");
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: messageKeys.detail(variables.params.id),
        });
      },
      onError: (error) => {
        console.error("Failed to update message:", error);
        toast.error("Failed to update message");
      },
    });
  };

  useDeleteMessageMutation = () => {
    return useMutation({
      mutationFn: deleteMessageMutation,
      onSuccess: () => {
        toast.success("Message deleted successfully");
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
      },
      onError: (error) => {
        console.error("Failed to delete message:", error);
        toast.error("Failed to delete message");
      },
    });
  };

  // Action hooks with error handling
  useCreateMessage = () => {
    const mutation = this.useCreateMessageMutation();

    return useCallback(
      async ({ params }: { params: MessageCreateParams }) => {
        try {
          const message = await mutation.mutateAsync({ params });
          return { success: true, message };
        } catch (error) {
          return { success: false, message: null };
        }
      },
      [mutation],
    );
  };

  useUpdateMessage = () => {
    const mutation = this.useUpdateMessageMutation();

    return useCallback(
      async ({ params }: { params: MessageUpdateParams }) => {
        try {
          const message = await mutation.mutateAsync({ params });
          return { success: true, message };
        } catch (error) {
          return { success: false, message: null };
        }
      },
      [mutation],
    );
  };

  useDeleteMessage = () => {
    const mutation = this.useDeleteMessageMutation();

    return useCallback(
      async ({ id }: { id: string }) => {
        try {
          await mutation.mutateAsync({ id });
          return { success: true };
        } catch (error) {
          return { success: false };
        }
      },
      [mutation],
    );
  };
}

export const messageController = new MessageController();
