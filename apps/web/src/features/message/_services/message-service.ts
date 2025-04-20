import type {
  Message,
  MessageCreateParams,
  MessageUpdateParams,
} from "../_domain/message-model";
import { messageApiRepo } from "../_libs/message-api-repo";

class MessageService {
  getMessages = async (): Promise<Message[]> => {
    return messageApiRepo.getMessages();
  };

  getMessage = async ({ id }: { id: string }): Promise<Message> => {
    return messageApiRepo.getMessage({ id });
  };

  createMessage = async ({
    params,
  }: {
    params: MessageCreateParams;
  }): Promise<Message> => {
    return messageApiRepo.createMessage({ params });
  };

  updateMessage = async ({
    params,
  }: {
    params: MessageUpdateParams;
  }): Promise<Message> => {
    return messageApiRepo.updateMessage({ params });
  };

  deleteMessage = async ({ id }: { id: string }): Promise<{ success: boolean }> => {
    return messageApiRepo.deleteMessage({ id });
  };
}

export const messageService = new MessageService();
