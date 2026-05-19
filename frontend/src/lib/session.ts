const SESSION_KEY = "lost-and-found-session";

export type SessionUser = {
  id: number;
  name: string;
  osztaly: string;
  isAdmin?: boolean;
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

export function signIn(name: string, osztaly?: string) {
  const normalizedName = name.trim();
  const klass = (osztaly || "").trim();
  const seed = `${normalizedName}|${klass}`;
  const session = {
    id: deriveUserId(seed),
    name: normalizedName || "Felhasználó",
    osztaly: klass || "",
  } as SessionUser;

  setSession(session);
  return session;
}