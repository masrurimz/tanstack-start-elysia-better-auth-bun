import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { ConfirmDialog } from "~/features/message/_components/confirm-dialog";
import { MessageForm } from "~/features/message/_components/message-form";
import { MessageList } from "~/features/message/_components/message-list";
import { messageController } from "~/features/message/_controllers/message-controller";
import { messagesQueryOptions } from "~/features/message/_libs/message-query";

export const Route = createFileRoute("/messages/")({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(messagesQueryOptions());
  },
  component: MessagesPage,
});

function MessagesPage() {
  const { data } = messageController.useMessagesQuery();
  const messages = data?.messages || [];

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const createMessageMutation = messageController.useCreateMessageMutation();
  const updateMessageMutation = messageController.useUpdateMessageMutation();
  const deleteMessageMutation = messageController.useDeleteMessageMutation();

  const isLoading =
    createMessageMutation.isPending ||
    updateMessageMutation.isPending ||
    deleteMessageMutation.isPending;

  const handleCreate = async ({ title, content }: { title: string; content: string }) => {
    try {
      await createMessageMutation.mutateAsync({
        params: { title, content },
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Failed to create message:", error);
    }
  };

  const handleUpdate = async ({ title, content }: { title: string; content: string }) => {
    if (!editingId) return;

    try {
      await updateMessageMutation.mutateAsync({
        params: { id: editingId, title, content },
      });
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      await deleteMessageMutation.mutateAsync({ id: messageToDelete });
      setMessageToDelete(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const messageToEdit = editingId
    ? messages.find((message) => message.id === editingId)
    : undefined;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Message List</h2>
        {!showCreateForm && !editingId && (
          <Button onClick={() => setShowCreateForm(true)} disabled={isLoading}>
            Create New Message
          </Button>
        )}
      </div>

      {showCreateForm && (
        <div className="mb-8">
          <MessageForm
            formTitle="Create New Message"
            submitLabel="Create"
            onSubmit={handleCreate}
            isSubmitting={createMessageMutation.isPending}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {editingId && messageToEdit && (
        <div className="mb-8">
          <MessageForm
            formTitle="Edit Message"
            submitLabel="Update"
            message={messageToEdit}
            onSubmit={handleUpdate}
            isSubmitting={updateMessageMutation.isPending}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <MessageList
        messages={messages}
        onEdit={({ id }) => setEditingId(id)}
        onDelete={({ id }) => setMessageToDelete(id)}
        emptyMessage="No messages found. Create one to get started!"
      />

      <ConfirmDialog
        isOpen={!!messageToDelete}
        onClose={() => setMessageToDelete(null)}
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
