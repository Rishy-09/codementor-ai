import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages, code } = await request.json();

    // The System Prompt: Defines the AI's personality
    const systemPrompt = `
      You are CodeMentor, a friendly and encouraging coding tutor.
      The user is working on this code:
      \`\`\`
      ${code}
      \`\`\`
      
      Answer their question based on the code above.
      IMPORTANT:
      1. Be concise (max 2-3 sentences).
      2. Do NOT just give the full solution immediately. Guide them.
      3. If there is an error, explain WHY it happened.
      4. Use a supportive tone (e.g., "Great start! Try checking...").
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages // Pass previous chat history
      ],
      model: 'llama-3.3-70b-versatile', // Fast & Smart
      temperature: 0.7,
      max_tokens: 300,
    });

    return new Response(JSON.stringify({ 
      content: completion.choices[0]?.message?.content || "I'm thinking..." 
    }), { status: 200 });

  } catch (error: any) {
    console.error('Chat Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to chat' }), { status: 500 });
  }
}