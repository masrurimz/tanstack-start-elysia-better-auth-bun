import { queryOptions } from "@tanstack/react-query";
import type {
  Message,
  MessageCreateParams,
  MessageUpdateParams,
} from "../_domain/message-model";
import { messageService } from "../_services/message-service";

// Query keys for messages
export const messageKeys = {
  all: ["messages"] as const,
  lists: () => [...messageKeys.all, "list"] as const,
  detail: (id: string) => [...messageKeys.all, "detail", id] as const,
};

// Query options for fetching all messages
export const messagesQueryOptions = () => {
  return queryOptions({
    queryKey: messageKeys.lists(),
    queryFn: async () => {
      const messages = await messageService.getMessages();
      return { messages };
    },
  });
};

// Query options for fetching a single message
export const messageQueryOptions = ({ id }: { id: string }) => {
  return queryOptions({
    queryKey: messageKeys.detail(id),
    queryFn: async () => {
      const message = await messageService.getMessage({ id });
      return { message };
    },
  });
};

// Mutation functions (without hooks)
export const createMessageMutation = async ({
  params,
}: {
  params: MessageCreateParams;
}) => {
  return messageService.createMessage({ params });
};

export const updateMessageMutation = async ({
  params,
}: {
  params: MessageUpdateParams;
}) => {
  return messageService.updateMessage({ params });
};

export const deleteMessageMutation = async ({ id }: { id: string }) => {
  return messageService.deleteMessage({ id });
};
