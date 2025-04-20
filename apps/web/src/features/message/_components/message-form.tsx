import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { Message } from "../_domain/message-model";
import { messageController } from "../_controllers/message-controller";

interface MessageFormProps {
  message?: Message;
  onSubmit: ({ title, content }: { title: string; content: string }) => void;
  isSubmitting?: boolean;
  formTitle: string;
  submitLabel: string;
  onCancel?: () => void;
}

export const MessageForm = ({
  message,
  onSubmit,
  isSubmitting = false,
  formTitle,
  submitLabel,
  onCancel,
}: MessageFormProps) => {
  const {
    formValues: { title, content },
    setTitle,
    setContent,
    resetForm,
    isValid,
  } = messageController.useMessageForm(message);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ title, content });
  };

  useEffect(() => {
    if (message) {
      setTitle(message.title);
      setContent(message.content);
    } else {
      resetForm();
    }
  }, [message, resetForm, setContent, setTitle]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Enter message content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              className="min-h-32"
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              type="button"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
