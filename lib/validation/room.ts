// Room code generation and validation utilities

const ROOM_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Unambiguous chars
const ROOM_CODE_LENGTH = 6;

/**
 * Generates a cryptographically random room code.
 */
export function generateRoomCode(): string {
  const chars = ROOM_CODE_CHARS;
  let code = '';
  const array = new Uint32Array(ROOM_CODE_LENGTH);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Server-side fallback
    for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
      array[i] = Math.floor(Math.random() * chars.length);
    }
  }
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    code += chars[array[i] % chars.length];
  }
  return code;
}

/**
 * Validates a room code format.
 * Returns an error message or null if valid.
 */
export function validateRoomCode(code: string): string | null {
  if (!code || typeof code !== 'string') return 'Room code is required';
  const normalized = code.toUpperCase().trim();
  if (normalized.length !== ROOM_CODE_LENGTH) {
    return `Room code must be ${ROOM_CODE_LENGTH} characters`;
  }
  const validChars = new RegExp(`^[${ROOM_CODE_CHARS}]+$`);
  if (!validChars.test(normalized)) {
    return 'Room code contains invalid characters';
  }
  return null;
}

/**
 * Normalizes a room code to uppercase and strips whitespace.
 */
export function normalizeRoomCode(code: string): string {
  return code.toUpperCase().trim();
}

/**
 * Simple in-memory room store for solo/demo mode.
 * In production, this would be replaced by Supabase.
 */
const demoRooms = new Map<string, { code: string; createdAt: number }>();

export function createDemoRoom(): string {
  const code = generateRoomCode();
  demoRooms.set(code, { code, createdAt: Date.now() });
  return code;
}

export function validateDemoRoom(code: string): boolean {
  const normalized = normalizeRoomCode(code);
  const err = validateRoomCode(normalized);
  if (err) return false;
  return demoRooms.has(normalized);
}

/**
 * Validates AI request payload
 */
export function validateAIRequest(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') return { valid: false, error: 'Invalid request body' };

  const b = body as Record<string, unknown>;

  if (typeof b.message !== 'string') return { valid: false, error: 'message must be a string' };
  if (b.message.length === 0) return { valid: false, error: 'message cannot be empty' };
  if (b.message.length > 500) return { valid: false, error: 'message too long (max 500 chars)' };

  const validActions = ['translate', 'simplify', 'visualize', 'explain_differently'];
  if (!validActions.includes(b.action as string)) {
    return { valid: false, error: `action must be one of: ${validActions.join(', ')}` };
  }

  if (b.targetLanguage && !['en', 'hi'].includes(b.targetLanguage as string)) {
    return { valid: false, error: 'targetLanguage must be en or hi' };
  }

  return { valid: true };
}
