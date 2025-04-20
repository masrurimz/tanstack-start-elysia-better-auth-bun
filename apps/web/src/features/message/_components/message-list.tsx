import type { Message } from "../_domain/message-model";
import { MessageCard } from "./message-card";

interface MessageListProps {
  messages: Message[];
  onEdit?: ({ id }: { id: string }) => void;
  onDelete?: ({ id }: { id: string }) => void;
  emptyMessage?: string;
}

export const MessageList = ({
  messages,
  onEdit,
  onDelete,
  emptyMessage = "No messages found",
}: MessageListProps) => {
  if (messages.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">{emptyMessage}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
