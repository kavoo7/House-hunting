export type DemoEnquiryStatus = "Sent" | "Awaiting response" | "Responded" | "Closed";

export type DemoEnquiry = {
  id: string;
  propertyId: string;
  propertyName: string;
  date: string;
  status: DemoEnquiryStatus;
};

export const demoEnquiries: DemoEnquiry[] = [
  { id: "enquiry-1", propertyId: "bright-airy-apartment", propertyName: "Bright & airy 2-bedroom apartment", date: "12 June 2026", status: "Sent" },
  { id: "enquiry-2", propertyId: "modern-westlands-home", propertyName: "Modern living in Westlands", date: "8 June 2026", status: "Awaiting response" },
  { id: "enquiry-3", propertyId: "peaceful-city-retreat", propertyName: "Your own peaceful city retreat", date: "2 June 2026", status: "Responded" },
];
