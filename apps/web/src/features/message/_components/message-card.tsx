import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Message } from "../_domain/message-model";

interface MessageCardProps {
  message: Message;
  onEdit?: ({ id }: { id: string }) => void;
  onDelete?: ({ id }: { id: string }) => void;
  showActions?: boolean;
}

export const MessageCard = ({
  message,
  onEdit,
  onDelete,
  showActions = true,
}: MessageCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{message.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </CardContent>
      {showActions && (onEdit || onDelete) && (
        <CardFooter className="flex justify-end gap-2">
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit({ id: message.id })}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" onClick={() => onDelete({ id: message.id })}>
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
