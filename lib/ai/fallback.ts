// Fallback AI transformations for when Gemini API is unavailable
// These are context-aware, game-specific responses

import { TransformAction, TransformRequest, TransformResponse } from './types';

const HINDI_TRANSLATIONS: Record<string, string> = {
  'Share your clue with the team': 'अपनी सुराग टीम के साथ साझा करें',
  'The spiral rune comes first': 'सर्पिल रूण पहले आता है',
  'Spiral means cyan, sun means amber, wave means violet':
    'सर्पिल का अर्थ है सियान, सूर्य का अर्थ है एम्बर, तरंग का अर्थ है बैंगनी',
  'Activate cyan first, then amber, then violet':
    'पहले सियान सक्रिय करें, फिर एम्बर, फिर बैंगनी',
  'The correct order is: Spiral → Sun → Wave':
    'सही क्रम है: सर्पिल → सूर्य → तरंग',
  'I need the rune sequence': 'मुझे रूण अनुक्रम चाहिए',
  'What color is the spiral rune?': 'सर्पिल रूण का रंग क्या है?',
};


function simplifyMessage(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('spiral') || lower.includes('rune') || lower.includes('sequence')) {
    return `Simple version: You need to turn on 3 switches in a specific order. Your teammates have the information you need — ask them!`;
  }
  if (lower.includes('cyan') || lower.includes('amber') || lower.includes('violet')) {
    return `Simple version: There are 3 colored switches — Cyan (blue-green), Amber (orange), and Violet (purple). Activate them in the right order.`;
  }
  return `Simple version: "${msg.slice(0, 100)}${msg.length > 100 ? '...' : ''}" — Ask your team for help understanding this.`;
}

function visualizeMessage(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('spiral') && lower.includes('sun') && lower.includes('wave')) {
    return `
📋 VISUAL GUIDE — RUNE SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1: ◈ Spiral Rune  →  [FIRST]
Step 2: ☀ Sun Rune     →  [SECOND]  
Step 3: ≋ Wave Rune    →  [THIRD]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Engineer: Activate in this order!`;
  }
  if (lower.includes('cyan') || lower.includes('amber') || lower.includes('violet')) {
    return `
⚡ SWITCH ACTIVATION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━
[1] 🔵 CYAN   → Activate FIRST
[2] 🟡 AMBER  → Activate SECOND
[3] 🟣 VIOLET → Activate THIRD
━━━━━━━━━━━━━━━━━━━━━━━━━
Do NOT skip steps!`;
  }
  return `
📌 KEY INFORMATION
━━━━━━━━━━━━━━━━━━
${msg.slice(0, 200)}
━━━━━━━━━━━━━━━━━━
Share this with your team!`;
}

function explainDifferently(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('rune') || lower.includes('spiral') || lower.includes('sequence')) {
    return `Think of it like a lock combination. Your team has:
• The order of symbols (Navigator knows this)
• What each symbol means in colors (Decoder knows this)  
• The actual switches to press (Engineer controls these)
Put all three together to open the energy core!`;
  }
  return `Let me put it another way: The team needs to share information. If you don't understand something, ask your teammate to rephrase it. Every player has a unique piece of the puzzle.`;
}

function translateToHindi(msg: string): string {
  // Check exact matches first
  for (const [en, hi] of Object.entries(HINDI_TRANSLATIONS)) {
    if (msg.toLowerCase().includes(en.toLowerCase())) {
      return hi;
    }
  }
  // Generic translation note
  return `[हिंदी अनुवाद — AI उपलब्ध नहीं] "${msg.slice(0, 100)}" — कृपया अपनी टीम के साथ मिलकर काम करें।`;
}

export function getFallbackTransform(req: TransformRequest): TransformResponse {
  let transformed: string;

  switch (req.action) {
    case 'translate':
      if (req.targetLanguage === 'hi') {
        transformed = translateToHindi(req.message);
      } else {
        transformed = req.message; // Already in English
      }
      break;
    case 'simplify':
      transformed = simplifyMessage(req.message);
      break;
    case 'visualize':
      transformed = visualizeMessage(req.message);
      break;
    case 'explain_differently':
      transformed = explainDifferently(req.message);
      break;
    default:
      transformed = req.message;
  }

  return {
    original: req.message,
    transformed,
    action: req.action,
    isAIGenerated: false,
    disclaimer:
      'This is a pre-built fallback response. Connect Gemini API for live AI transformations.',
  };
}
