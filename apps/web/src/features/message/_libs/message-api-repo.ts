import { api } from "~/libs/eden-api-client/eden-client";
import type {
  Message,
  MessageCreateParams,
  MessageUpdateParams,
} from "../_domain/message-model";
import type { MessageRepository } from "../_domain/message-repository";

export class MessageApiRepo implements MessageRepository {
  getMessages = async (): Promise<Message[]> => {
    const { data } = await api.messages.index.get();

    return data?.messages || [];
  };

  getMessage = async ({ id }: { id: string }): Promise<Message> => {
    const { data } = await api.messages[":id"].get({
      $query: { id },
    });

    if (!data?.data) {
      throw new Error("Message not found");
    }

    return data.data;
  };

  createMessage = async ({
    params,
  }: {
    params: MessageCreateParams;
  }): Promise<Message> => {
    const { data } = await api.messages.index.post({
      content: params.content,
      title: params.title,
    });

    if (!data?.data) {
      throw new Error("Failed to create message");
    }

    return data.data;
  };

  updateMessage = async ({
    params,
  }: {
    params: MessageUpdateParams;
  }): Promise<Message> => {
    const { id, ...updateData } = params;

    const { data } = await api.messages[":id"].patch({
      $query: { id },
      content: updateData.content,
      title: updateData.title,
    });

    if (!data?.data) {
      throw new Error("Failed to update message");
    }

    return data.data;
  };

  deleteMessage = async ({ id }: { id: string }): Promise<{ success: boolean }> => {
    await api.messages[":id"].delete({ $query: { id } });
    return { success: true };
  };
}

export const messageApiRepo = new MessageApiRepo();
