export async function getMessages() {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/messages`);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      };

      return response.json();
    }

export async function createMessage(message: {
  sender_id: string;
  recipient_name: string;
  content: string;
}) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error("Failed to create message");
    }

    return response.json();
}

export async function deleteMessage(messageId: string) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/messages/${messageId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete message");
    }

    return response.json();
}
