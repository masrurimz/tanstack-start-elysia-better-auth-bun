import type { Message, MessageCreateParams, MessageUpdateParams } from "./message-model";

export interface MessageRepository {
  getMessages: () => Promise<Message[]>;
  getMessage: ({ id }: { id: string }) => Promise<Message>;
  createMessage: ({ params }: { params: MessageCreateParams }) => Promise<Message>;
  updateMessage: ({ params }: { params: MessageUpdateParams }) => Promise<Message>;
  deleteMessage: ({ id }: { id: string }) => Promise<{ success: boolean }>;
}
