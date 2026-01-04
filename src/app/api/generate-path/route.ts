import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not set');
    }

    const prompt = `
You are an expert coding tutor creating a personalized learning roadmap for a beginner.

User answers:
- Goal: ${answers.goal}
- Experience: ${answers.experience}
- Preferred language: ${answers.language}
- Learning style: ${answers.style}
- Weekly time: ${answers.time}

Generate a personalized learning path with exactly 6 modules.
Return ONLY valid JSON in this exact format (no extra text or markdown):

{
  "modules": [
    {
      "title": "Short motivating module title",
      "description": "2-3 sentences about what they'll learn and why it's useful",
      "duration": "Estimated time (e.g., 3-5 hours)"
    }
  ]
}

Prioritize practical projects. Use ${answers.language.includes('Python') ? 'Python' : answers.language.includes('JavaScript') ? 'JavaScript' : 'Python or JavaScript based on goal'}.
Adapt to beginner level and "${answers.style}" learning style.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',  // Updated 2026 model — fast & smart
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content?.trim() || '';

    if (!content) {
      throw new Error('Empty response from Groq');
    }

    // Extract JSON block
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}') + 1;
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('No JSON found in response');
    }

    const jsonString = content.substring(jsonStart, jsonEnd);
    const roadmap = JSON.parse(jsonString);

    return new Response(JSON.stringify(roadmap), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate path', 
        details: error.message || 'Unknown error' 
      }),
      { status: 500 }
    );
  }
}