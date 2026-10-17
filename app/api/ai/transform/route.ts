import { NextRequest, NextResponse } from 'next/server';
import { validateAIRequest } from '@/lib/validation/room';
import { getFallbackTransform } from '@/lib/ai/fallback';
import { TransformRequest } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate
  const { valid, error } = validateAIRequest(body);
  if (!valid) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const req = body as TransformRequest;

  // Try Gemini if key is available
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // No key — use fallback and be transparent about it
    const fallback = getFallbackTransform(req);
    return NextResponse.json(fallback, { status: 200 });
  }

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = buildPrompt(req);
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Never inject as HTML — return as plain text string
    return NextResponse.json({
      original: req.message,
      transformed: text,
      action: req.action,
      isAIGenerated: true,
      disclaimer: 'AI-generated transformation. Meaning may not be perfectly preserved. Use judgment when acting on this.',
    }, { status: 200 });

  } catch (err: unknown) {
    console.error('[AI Transform] Gemini error:', err);

    // Fallback gracefully on any AI error
    const fallback = getFallbackTransform(req);
    fallback.disclaimer = 'Gemini API unavailable — using built-in fallback transformation.';
    return NextResponse.json(fallback, { status: 200 });
  }
}

function buildPrompt(req: TransformRequest): string {
  const gameContext = `You are helping players communicate in a collaborative puzzle game called GAP//BREAKERS. 
Players are trying to repair a broken bridge by activating energy switches in the correct order: CYAN → AMBER → VIOLET.
The three player roles are: Navigator (has the rune sequence order), Decoder (knows rune-to-color mappings), Engineer (controls the switches).
Keep responses concise (under 200 words). Do NOT reveal the final answer unless it's already known from context.`;

  switch (req.action) {
    case 'translate':
      return `${gameContext}

Translate the following message into ${req.targetLanguage === 'hi' ? 'Hindi (Devanagari script)' : 'English'}.
Preserve the original meaning exactly. If game-specific terms (rune names, switch colors) don't have clear translations, keep them in English.

Message to translate:
"${req.message}"

Provide only the translated text, nothing else.`;

    case 'simplify':
      return `${gameContext}

Rewrite the following message in simple, clear language that anyone can understand.
Avoid jargon. Use short sentences. Keep all important information intact.

Message to simplify:
"${req.message}"

Provide only the simplified version, nothing else.`;

    case 'visualize':
      return `${gameContext}

Transform the following message into a structured visual explanation.
Use numbered steps, labels, arrows (→), symbols, or a simple diagram using text characters.
Make it easy to scan and act on quickly.

Message to visualize:
"${req.message}"

Provide only the visual explanation, nothing else.`;

    case 'explain_differently':
      return `${gameContext}

The player did not understand the following message. Explain it in a completely different way.
Use an analogy, simpler words, or a different structure. Keep it short and actionable.

Message to re-explain:
"${req.message}"

Provide only the alternative explanation, nothing else.`;

    default:
      return `Summarize this message in one sentence: "${req.message}"`;
  }
}
