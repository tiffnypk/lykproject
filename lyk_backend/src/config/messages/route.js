import sql from "@/app/(tabs)/api/utils/sql";

export async function POST(request) {
  try {
    const { sender_id, recipient_name, content } = await request.json();

    if (!sender_id || !recipient_name || !content) {
      return new Response("Missing required fields", { status: 400 });
    }

    const [message] = await sql`
      INSERT INTO messages (sender_id, recipient_name, content)
      VALUES (${sender_id}, ${recipient_name}, ${content})
      RETURNING *
    `;

    return Response.json(message);
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sender_id = searchParams.get("sender_id");

    let messages;
    if (sender_id) {
      messages = await sql`
        SELECT * FROM messages 
        WHERE sender_id = ${sender_id} 
        ORDER BY created_at DESC
      `;
    } else {
      messages = await sql`
        SELECT * FROM messages 
        ORDER BY created_at DESC
      `;
    }

    return Response.json(messages);
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
