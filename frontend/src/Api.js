// src/api.js
const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function api(path, { method = "GET", body, token, signal } = {}) {
  try {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal,
      credentials: "include",
    });

    // Try to read response JSON safely
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    // Handle API error
    if (!res.ok) {
      const message = data?.message || data?.error || `HTTP ${res.status}`;
      const error = new Error(message);
      error.status = res.status;
      throw error;
    }

    return data;
  } catch (err) {
    console.error(`API Error [${method} ${path}]:`, err.message);
    throw err;
  }
}
