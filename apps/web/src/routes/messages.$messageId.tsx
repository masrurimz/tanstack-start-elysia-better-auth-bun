import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { ConfirmDialog } from "~/features/message/_components/confirm-dialog";
import { MessageCard } from "~/features/message/_components/message-card";
import { MessageForm } from "~/features/message/_components/message-form";
import { messageController } from "~/features/message/_controllers/message-controller";
import { messageQueryOptions } from "~/features/message/_libs/message-query";

export const Route = createFileRoute("/messages/$messageId")({
  loader: async ({ params, context }) => {
    return context.queryClient.ensureQueryData(
      messageQueryOptions({ id: params.messageId }),
    );
  },
  component: MessageDetailPage,
});

function MessageDetailPage() {
  const params = Route.useParams();
  const { data } = messageController.useMessageQuery({ id: params.messageId });
  const message = data?.message;

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateMessageMutation = messageController.useUpdateMessageMutation();
  const deleteMessageMutation = messageController.useDeleteMessageMutation();

  const isLoading = updateMessageMutation.isPending || deleteMessageMutation.isPending;

  if (!message) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Message Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The message you are looking for does not exist or has been deleted.
        </p>
        <Button onClick={() => navigate({ to: "/messages" })}>Back to Messages</Button>
      </div>
    );
  }

  const handleUpdate = async ({ title, content }: { title: string; content: string }) => {
    try {
      await updateMessageMutation.mutateAsync({
        params: { id: params.messageId, title, content },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessageMutation.mutateAsync({ id: params.messageId });
      navigate({ to: "/messages" });
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/messages" })}
          disabled={isLoading}
        >
          Back to List
        </Button>

        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isLoading}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <MessageForm
          formTitle="Edit Message"
          submitLabel="Update"
          message={message}
          onSubmit={handleUpdate}
          isSubmitting={updateMessageMutation.isPending}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <MessageCard message={message} showActions={false} />
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
      />
    </div>
  );
}
