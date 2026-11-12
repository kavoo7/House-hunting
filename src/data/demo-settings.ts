export type DemoPlatformSettings = {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  description: string;
  allowPendingEdits: boolean;
  approvedEditsRequireReview: boolean;
  rejectedListingsCanResubmit: boolean;
  propertyTypes: { label: string; active: boolean }[];
  amenities: { label: string; active: boolean }[];
  notifySubmissions: boolean;
  notifyReports: boolean;
  notifyReviewActivity: boolean;
};

export const DEMO_SETTINGS_KEY = "house-hunting-demo-platform-settings";
export const defaultDemoSettings: DemoPlatformSettings = { platformName: "House Hunt", supportEmail: "support@househunt.test", supportPhone: "+254 700 000 000", description: "A thoughtful way to find rental homes across Nairobi.", allowPendingEdits: true, approvedEditsRequireReview: true, rejectedListingsCanResubmit: true, propertyTypes: ["Bedsitter", "Studio", "Apartment", "Maisonette", "Townhouse", "Bungalow", "Standalone house", "Other"].map((label) => ({ label, active: true })), amenities: ["Balcony", "Parking", "24-hour security", "Fitted kitchen", "Swimming pool", "Gym access", "Backup generator", "On-site caretaker"].map((label) => ({ label, active: true })), notifySubmissions: true, notifyReports: true, notifyReviewActivity: true };

export function readDemoSettings(): DemoPlatformSettings { if (typeof window === "undefined") return defaultDemoSettings; try { const stored = window.sessionStorage.getItem(DEMO_SETTINGS_KEY); return stored ? JSON.parse(stored) as DemoPlatformSettings : defaultDemoSettings; } catch { return defaultDemoSettings; } }
export function saveDemoSettings(settings: DemoPlatformSettings) { window.sessionStorage.setItem(DEMO_SETTINGS_KEY, JSON.stringify(settings)); }
