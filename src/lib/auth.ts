// Demo-only localStorage auth. Do NOT use in production.
export type AuthUser = { name: string; email: string; password: string };

const USERS_KEY = "authUsers";
const CURRENT_KEY = "authUser";
const RESET_KEY = "authResetCodes"; // { [email]: { code: string, expires: number } }

function readUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as AuthUser[]) : [];
}

function writeUsers(users: AuthUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUser(): Omit<AuthUser, "password"> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CURRENT_KEY);
  return raw ? (JSON.parse(raw) as Omit<AuthUser, "password">) : null;
}

export function loginSession(user: Omit<AuthUser, "password">) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
}

export function register(name: string, email: string, password: string) {
  const users = readUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("An account with this email already exists.");
  const user: AuthUser = { name: name.trim(), email: email.toLowerCase().trim(), password };
  users.push(user);
  writeUsers(users);
  // start a session
  loginSession({ name: user.name, email: user.email });
  return { name: user.name, email: user.email };
}

export function authenticate(email: string, password: string) {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) throw new Error("Invalid email or password.");
  loginSession({ name: user.name, email: user.email });
  return { name: user.name, email: user.email };
}

// ---------- Forgot/Reset Password (demo) ----------
type ResetStore = Record<string, { code: string; expires: number }>;

function readResetStore(): ResetStore {
  const raw = localStorage.getItem(RESET_KEY);
  return raw ? (JSON.parse(raw) as ResetStore) : {};
}
function writeResetStore(store: ResetStore) {
  localStorage.setItem(RESET_KEY, JSON.stringify(store));
}

// Returns the code (in a real app you'd email it)
export function requestPasswordReset(email: string) {
  const users = readUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!exists) throw new Error("No account found with that email.");
  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  const store = readResetStore();
  store[email.toLowerCase()] = { code, expires };
  writeResetStore(store);
  return { code, expires };
}

export function verifyResetCode(email: string, code: string) {
  const store = readResetStore();
  const rec = store[email.toLowerCase()];
  if (!rec) return false;
  if (Date.now() > rec.expires) return false;
  return rec.code === code.trim();
}

export function resetPassword(email: string, code: string, newPassword: string) {
  if (!verifyResetCode(email, code)) throw new Error("Invalid or expired code.");
  const users = readUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) throw new Error("User not found.");
  users[idx].password = newPassword;
  writeUsers(users);
  // clear used code
  const store = readResetStore();
  delete store[email.toLowerCase()];
  writeResetStore(store);
}
