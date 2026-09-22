/**
 * Backend API client — all AI calls go through backend, never expose keys in client
 */

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

async function request(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const api = {
  analyze: (formData: FormData) => {
    // multipart for photo upload
    return fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    });
  },
  getAnalysis: (id: string) => request(`/api/analyze/${id}`),
  generatePlan: (analysisId: string) => request(`/api/plan/generate`, { method: 'POST', body: JSON.stringify({ analysis_id: analysisId }) }),
  getCurrentPlan: () => request(`/api/plan/current`),
  completeTask: (itemId: string) => request(`/api/plan/item/${itemId}/complete`, { method: 'POST' }),
  sendCoachMessage: (message: string, conversationId?: string) =>
    request(`/api/coach/message`, { method: 'POST', body: JSON.stringify({ message, conversation_id: conversationId }) }),
};
