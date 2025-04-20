import type { Message as DbMessage } from "@acme/db/schema";

export type Message = DbMessage;

export interface MessageCreateParams {
  title: string;
  content: string;
}

export interface MessageUpdateParams {
  id: string;
  title: string;
  content: string;
}

export interface MessageResponse {
  success: boolean;
  data: Message;
  message?: string;
}

export interface MessagesResponse {
  success: boolean;
  data: Message[];
}
