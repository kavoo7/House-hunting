export type ContributorPropertyStatus = "pending" | "approved" | "rejected" | "draft";

export type ContributorProperty = {
  id: string;
  image: string;
  title: string;
  type?: string;
  location: string;
  monthlyRent: number;
  submittedOn: string;
  status: ContributorPropertyStatus;
  publicPropertyId?: string;
  contributorName?: string;
  description?: string;
  county?: string;
  estate?: string;
  street?: string;
  locationDescription?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  furnishing?: string;
  parking?: string;
  amenities?: string;
  contactName?: string;
  phone?: string;
  whatsapp?: string;
  rejectionReason?: string;
  statusHistory?: { status: ContributorPropertyStatus; date: string; reason?: string }[];
};

export const CONTRIBUTOR_PROPERTIES_KEY = "house-hunting-demo-contributor-properties";
export const DELETED_CONTRIBUTOR_PROPERTIES_KEY = "house-hunting-demo-deleted-contributor-properties";

// Demonstration records only. This shape is intentionally ready to map to an API response later.
export const demoContributorProperties: ContributorProperty[] = [
  { id: "contributor-kilimani-01", image: "/featured-home-kilimani.png", title: "Bright & airy 2-bedroom apartment", location: "Kilimani · near Yaya Centre", monthlyRent: 85000, submittedOn: "12 Nov 2026", status: "pending" },
  { id: "contributor-westlands-01", image: "/featured-home-westlands.png", title: "Modern living in Westlands", location: "Westlands · near Sarit Centre", monthlyRent: 65000, submittedOn: "08 Nov 2026", status: "approved", publicPropertyId: "modern-westlands-home" },
  { id: "contributor-kileleshwa-01", image: "/featured-home-kileleshwa.png", title: "Your own peaceful city retreat", location: "Kileleshwa · Oloitoktok Road", monthlyRent: 45000, submittedOn: "02 Nov 2026", status: "approved", publicPropertyId: "peaceful-city-retreat" },
  { id: "contributor-lavington-01", image: "/featured-home-westlands.png", title: "Sunlit family home near the city", location: "Lavington · near Junction Mall", monthlyRent: 110000, submittedOn: "29 Oct 2026", status: "rejected" },
  { id: "contributor-hurlingham-01", image: "/featured-home-kilimani.png", title: "Calm one-bedroom in a central spot", location: "Hurlingham · near Nairobi Hospital", monthlyRent: 55000, submittedOn: "24 Oct 2026", status: "pending" },
  { id: "contributor-kileleshwa-02", image: "/featured-home-kileleshwa.png", title: "Quiet modern apartment with balcony", location: "Kileleshwa · near Kasuku Centre", monthlyRent: 72000, submittedOn: "18 Oct 2026", status: "approved" },
].map((property) => ({ ...property, contributorName: "Demo Agent" })) as ContributorProperty[];

export function readStoredContributorProperties(): ContributorProperty[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.sessionStorage.getItem(CONTRIBUTOR_PROPERTIES_KEY);
    return stored ? JSON.parse(stored) as ContributorProperty[] : [];
  } catch { return []; }
}

export function saveContributorProperty(property: ContributorProperty) {
  const properties = [property, ...readStoredContributorProperties()];
  window.sessionStorage.setItem(CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify(properties));
}

export function getContributorProperties(contributorName?: string) {
  const name = contributorName || "Demo Agent";
  const deleted = readDeletedContributorPropertyIds();
  return [...readStoredContributorProperties(), ...demoContributorProperties].filter((property) => property.contributorName === name && !deleted.includes(property.id));
}

export function deleteContributorProperty(propertyId: string) {
  const remaining = readStoredContributorProperties().filter((property) => property.id !== propertyId);
  window.sessionStorage.setItem(CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify(remaining));
  const deleted = readDeletedContributorPropertyIds();
  window.sessionStorage.setItem(DELETED_CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify([...new Set([...deleted, propertyId])]));
}

export function updateContributorProperty(property: ContributorProperty) {
  const properties = readStoredContributorProperties().filter((item) => item.id !== property.id);
  window.sessionStorage.setItem(CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify([property, ...properties]));
}

function readDeletedContributorPropertyIds(): string[] {
  try { const stored = window.sessionStorage.getItem(DELETED_CONTRIBUTOR_PROPERTIES_KEY); return stored ? JSON.parse(stored) as string[] : []; } catch { return []; }
}

