export type ContactAction = { display: string; href: string };

function phoneDigits(value: string) {
  const trimmed = value.trim();
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return null;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 ? digits : null;
}

export function isValidPhoneNumber(value: string) {
  return value.trim() === "" || phoneDigits(value) !== null;
}

export function isValidWhatsAppNumber(value: string) {
  if (value.trim() === "") return true;
  return value.trim().startsWith("+") && phoneDigits(value) !== null;
}

export function getPhoneAction(value: string): ContactAction | null {
  const digits = phoneDigits(value);
  if (!digits) return null;
  const normalized = value.trim().startsWith("+") ? `+${digits}` : digits;
  return { display: value.trim(), href: `tel:${normalized}` };
}

export function getWhatsAppAction(value: string): ContactAction | null {
  if (!isValidWhatsAppNumber(value)) return null;
  const digits = phoneDigits(value);
  return digits ? { display: value.trim(), href: `https://wa.me/${digits}` } : null;
}

export function isValidEmailAddress(value: string) {
  const email = value.trim();
  return email === "" || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.toLowerCase().endsWith(".test"));
}

export function getEmailAction(value: string): ContactAction | null {
  const email = value.trim();
  return isValidEmailAddress(email) && email ? { display: email, href: `mailto:${email}` } : null;
}
