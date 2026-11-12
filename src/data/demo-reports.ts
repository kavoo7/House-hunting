export type DemoReportStatus = "open" | "under-investigation" | "resolved" | "dismissed";
export type DemoReportCategory = "Suspicious or fraudulent property" | "Incorrect property information" | "Property no longer available" | "Misleading photos or descriptions" | "Inappropriate content" | "Contributor misconduct" | "User complaint" | "Other";
export type DemoReport = { id: string; category: DemoReportCategory; propertyId?: string; propertyTitle?: string; reporterName: string; reporterEmail: string; description: string; submittedOn: string; status: DemoReportStatus; assignedAdministrator?: string; resolutionNote?: string; history: { status: DemoReportStatus; administrator: string; date: string; note?: string }[] };
export const DEMO_REPORTS_KEY = "house-hunting-demo-reports";
export const reportCategories: DemoReportCategory[] = ["Suspicious or fraudulent property", "Incorrect property information", "Property no longer available", "Misleading photos or descriptions", "Inappropriate content", "Contributor misconduct", "User complaint", "Other"];

export function readDemoReports(): DemoReport[] { if (typeof window === "undefined") return []; try { const value = window.sessionStorage.getItem(DEMO_REPORTS_KEY); return value ? JSON.parse(value) as DemoReport[] : []; } catch { return []; } }
export function saveDemoReport(report: DemoReport) { const reports = readDemoReports(); window.sessionStorage.setItem(DEMO_REPORTS_KEY, JSON.stringify([report, ...reports])); }
export function updateDemoReport(report: DemoReport) { window.sessionStorage.setItem(DEMO_REPORTS_KEY, JSON.stringify(readDemoReports().map((item) => item.id === report.id ? report : item))); }
