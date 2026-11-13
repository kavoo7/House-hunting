export type ContributorPropertyStatus = "pending" | "approved" | "rejected" | "changes-requested" | "draft";
export type PropertyReviewAction = "approved" | "rejected" | "changes-requested" | "admin-edited";

export type ContributorProperty = {
  /** Stable record ID shared by contributor, admin and public views. */
  id: string;
  /** Stable account ID for ownership; demo profiles use their email address. */
  contributorId?: string;
  contributorName?: string;
  /** Public route slug retained across edits and review transitions. */
  publicPropertyId?: string;
  image: string;
  gallery?: string[];
  title: string;
  type?: string;
  location: string;
  monthlyRent: number;
  submittedOn: string;
  lastUpdatedOn?: string;
  status: ContributorPropertyStatus;
  publicationStatus?: "published" | "unpublished";
  availability?: string;
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
  correctionMessage?: string;
  reviewHistory?: { action: PropertyReviewAction; administrator: string; date: string; message?: string }[];
  statusHistory?: { status: ContributorPropertyStatus; date: string; reason?: string }[];
};

export const CONTRIBUTOR_PROPERTIES_KEY = "house-hunting-demo-contributor-properties";
export const DELETED_CONTRIBUTOR_PROPERTIES_KEY = "house-hunting-demo-deleted-contributor-properties";
export const DEMO_AGENT_ID = "demo.agent@househunt.test";

// The same records back contributor, admin and public listing views. Sample
// contact details are intentionally absent; contributors may supply their own.
export const demoContributorProperties: ContributorProperty[] = [
  {
    id: "contributor-kilimani-01",
    contributorId: DEMO_AGENT_ID,
    contributorName: "Demo Agent",
    publicPropertyId: "bright-airy-apartment",
    image: "/featured-home-kilimani.png",
    gallery: ["/featured-home-kilimani.png", "/featured-home-westlands.png", "/featured-home-kileleshwa.png"],
    title: "Bright & airy 2-bedroom apartment",
    location: "Kilimani · near Yaya Centre",
    estate: "Kilimani",
    county: "Nairobi",
    locationDescription: "Kilimani · near Yaya Centre",
    monthlyRent: 85000,
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    amenities: "Fitted kitchen, Balcony, 24-hour security, Parking space",
    availability: "New listing",
    description: "A bright, comfortable apartment in the heart of Kilimani, with generous living spaces and easy access to cafés, shops and everyday essentials. The home is designed for relaxed city living, with plenty of natural light throughout the day.",
    submittedOn: "12 Nov 2026",
    status: "pending",
    publicationStatus: "unpublished",
  },
  {
    id: "contributor-westlands-01",
    contributorId: DEMO_AGENT_ID,
    contributorName: "Demo Agent",
    publicPropertyId: "modern-westlands-home",
    image: "/featured-home-westlands.png",
    gallery: ["/featured-home-westlands.png", "/featured-home-kilimani.png", "/featured-home-kileleshwa.png"],
    title: "Modern living in Westlands",
    location: "Westlands · near Sarit Centre",
    estate: "Westlands",
    county: "Nairobi",
    locationDescription: "Westlands · near Sarit Centre",
    monthlyRent: 65000,
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    amenities: "Open-plan living, Gym access, Backup generator, Secure parking",
    availability: "Available now",
    description: "Set close to the energy of Westlands, this modern apartment offers a practical layout, welcoming finishes and a convenient base for work, weekends and everything in between.",
    submittedOn: "08 Nov 2026",
    status: "approved",
    publicationStatus: "published",
  },
  {
    id: "contributor-kileleshwa-01",
    contributorId: DEMO_AGENT_ID,
    contributorName: "Demo Agent",
    publicPropertyId: "peaceful-city-retreat",
    image: "/featured-home-kileleshwa.png",
    gallery: ["/featured-home-kileleshwa.png", "/featured-home-kilimani.png", "/featured-home-westlands.png"],
    title: "Your own peaceful city retreat",
    location: "Kileleshwa · Oloitoktok Road",
    estate: "Kileleshwa",
    county: "Nairobi",
    locationDescription: "Kileleshwa · Oloitoktok Road",
    monthlyRent: 45000,
    bedrooms: 1,
    bathrooms: 1,
    area: 68,
    amenities: "Natural light, Quiet compound, Water storage, On-site caretaker",
    availability: "Available now",
    description: "A calm one-bedroom home in leafy Kileleshwa, with a warm, welcoming feel and a location that keeps Nairobi's best neighbourhoods within easy reach.",
    submittedOn: "02 Nov 2026",
    status: "approved",
    publicationStatus: "published",
  },
  {
    id: "contributor-lavington-01",
    contributorId: DEMO_AGENT_ID,
    contributorName: "Demo Agent",
    image: "/featured-home-westlands.png",
    title: "Sunlit family home near the city",
    location: "Lavington · near Junction Mall",
    estate: "Lavington",
    county: "Nairobi",
    monthlyRent: 110000,
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    submittedOn: "29 Oct 2026",
    status: "rejected",
    publicationStatus: "unpublished",
  },
  {
    id: "contributor-hurlingham-01",
    contributorId: DEMO_AGENT_ID,
    contributorName: "Demo Agent",
    image: "/featured-home-kilimani.png",
    title: "Calm one-bedroom in a central spot",
    location: "Hurlingham · near Nairobi Hospital",
    estate: "Hurlingham",
    county: "Nairobi",
    monthlyRent: 55000,
    bedrooms: 1,
    bathrooms: 1,
    area: 62,
    submittedOn: "24 Oct 2026",
    status: "pending",
    publicationStatus: "unpublished",
  },
  {
    id: "contributor-kileleshwa-02",
    contributorId: DEMO_AGENT_ID,
    contributorName: "Demo Agent",
    publicPropertyId: "quiet-modern-apartment",
    image: "/featured-home-kileleshwa.png",
    title: "Quiet modern apartment with balcony",
    location: "Kileleshwa · near Kasuku Centre",
    estate: "Kileleshwa",
    county: "Nairobi",
    monthlyRent: 72000,
    bedrooms: 2,
    bathrooms: 2,
    area: 102,
    submittedOn: "18 Oct 2026",
    status: "approved",
    publicationStatus: "published",
    availability: "Available now",
  },
];

export function readStoredContributorProperties(): ContributorProperty[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.sessionStorage.getItem(CONTRIBUTOR_PROPERTIES_KEY);
    const value: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(value) ? value as ContributorProperty[] : [];
  } catch {
    return [];
  }
}

export function getAllContributorProperties(): ContributorProperty[] {
  const records = new Map(demoContributorProperties.map((property) => [property.id, property]));
  for (const property of readStoredContributorProperties()) records.set(property.id, property);
  const deleted = new Set(readDeletedContributorPropertyIds());
  return [...records.values()].filter((property) => !deleted.has(property.id));
}

export function getContributorProperties(contributorId?: string, contributorName?: string) {
  const name = contributorName ?? (contributorId ? undefined : "Demo Agent");
  return getAllContributorProperties().filter((property) => {
    if (property.contributorId && contributorId) return property.contributorId === contributorId;
    return Boolean(name && property.contributorName === name);
  });
}

export function getPublishedContributorProperties() {
  return getAllContributorProperties().filter((property) => property.status === "approved" && property.publicationStatus === "published" && Boolean(property.publicPropertyId));
}

export function getPublishedContributorProperty(publicPropertyId: string) {
  return getPublishedContributorProperties().find((property) => property.publicPropertyId === publicPropertyId);
}

export function saveContributorProperty(property: ContributorProperty) {
  updateContributorProperty(property);
}

export function updateContributorProperty(property: ContributorProperty) {
  const properties = readStoredContributorProperties().filter((item) => item.id !== property.id);
  window.sessionStorage.setItem(CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify([property, ...properties]));
}

export function deleteContributorProperty(propertyId: string) {
  const remaining = readStoredContributorProperties().filter((property) => property.id !== propertyId);
  window.sessionStorage.setItem(CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify(remaining));
  const deleted = readDeletedContributorPropertyIds();
  window.sessionStorage.setItem(DELETED_CONTRIBUTOR_PROPERTIES_KEY, JSON.stringify([...new Set([...deleted, propertyId])]));
}

function readDeletedContributorPropertyIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.sessionStorage.getItem(DELETED_CONTRIBUTOR_PROPERTIES_KEY);
    const value: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(value) ? value as string[] : [];
  } catch {
    return [];
  }
}
