import { DEMO_ACCOUNTS, type DemoRole } from "@/components/auth/demo-auth";

export type DemoAccountStatus = "active" | "suspended";
export type DemoUser = { id: string; name: string; email: string; phone?: string; role: DemoRole; status: DemoAccountStatus; suspensionReason?: string };
export const DEMO_USER_STATUS_KEY = "house-hunting-demo-user-statuses";

export const demoUsers: DemoUser[] = DEMO_ACCOUNTS.map((account) => ({ id: account.email, name: account.name, email: account.email, phone: undefined, role: account.role, status: "active" }));

export function readDemoUsers() {
  if (typeof window === "undefined") return demoUsers;
  try {
    const stored = window.sessionStorage.getItem(DEMO_USER_STATUS_KEY);
    const statuses = stored ? JSON.parse(stored) as Record<string, Pick<DemoUser, "status" | "suspensionReason">> : {};
    const roles = readDemoUserRoles();
    return demoUsers.map((user) => ({ ...user, ...(roles[user.id] ? { role: roles[user.id] } : {}), ...(statuses[user.id] || {}) }));
  } catch { return demoUsers; }
}

export function updateDemoUserStatus(userId: string, status: DemoAccountStatus, suspensionReason?: string) {
  const current = readDemoUserStatuses();
  current[userId] = { status, suspensionReason };
  window.sessionStorage.setItem(DEMO_USER_STATUS_KEY, JSON.stringify(current));
}

export function getDemoAccountRole(userId: string) {
  const stored = readDemoUserRoles();
  return stored[userId] || demoUsers.find((user) => user.id === userId)?.role || "user";
}

export function updateDemoAccountRole(userId: string, role: DemoRole) {
  const roles = readDemoUserRoles(); roles[userId] = role;
  window.sessionStorage.setItem("house-hunting-demo-user-roles", JSON.stringify(roles));
}

function readDemoUserRoles(): Record<string, DemoRole> {
  try { const stored = window.sessionStorage.getItem("house-hunting-demo-user-roles"); return stored ? JSON.parse(stored) as Record<string, DemoRole> : {}; } catch { return {}; }
}

function readDemoUserStatuses() {
  try { const stored = window.sessionStorage.getItem(DEMO_USER_STATUS_KEY); return stored ? JSON.parse(stored) as Record<string, Pick<DemoUser, "status" | "suspensionReason">> : {}; } catch { return {}; }
}
