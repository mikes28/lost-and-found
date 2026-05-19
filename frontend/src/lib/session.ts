const SESSION_KEY = "lost-and-found-session";

export type SessionUser = {
  id: number;
  email: string;
  name: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function deriveUserId(seed: string) {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash % 900000) + 100000;
}

export function getSession(): SessionUser | null {
  if (!isBrowser()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as SessionUser;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setSession(session: SessionUser) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export function signIn(email: string, name?: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const session = {
    id: deriveUserId(normalizedEmail),
    email: normalizedEmail,
    name: name?.trim() || normalizedEmail.split("@")[0] || "Felhasználó",
  };

  setSession(session);
  return session;
}