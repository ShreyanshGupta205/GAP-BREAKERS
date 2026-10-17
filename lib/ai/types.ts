// AI transformation types and client-safe caller

export type TransformAction = 'translate' | 'simplify' | 'visualize' | 'explain_differently';

export interface TransformRequest {
  message: string;
  action: TransformAction;
  targetLanguage?: 'en' | 'hi';
  context?: string;
}

export interface TransformResponse {
  original: string;
  transformed: string;
  action: TransformAction;
  isAIGenerated: boolean;
  disclaimer?: string;
  error?: string;
}

/**
 * Client-safe function to call the server-side AI transformation endpoint.
 * Falls back gracefully if the endpoint is unavailable.
 */
export async function transformMessage(req: TransformRequest): Promise<TransformResponse> {
  try {
    const res = await fetch('/api/ai/transform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Unknown error' }));
      return {
        original: req.message,
        transformed: req.message,
        action: req.action,
        isAIGenerated: false,
        error: err.error ?? 'Transform failed',
      };
    }

    return await res.json();
  } catch {
    return {
      original: req.message,
      transformed: req.message,
      action: req.action,
      isAIGenerated: false,
      error: 'Network error — using original message',
    };
  }
}
