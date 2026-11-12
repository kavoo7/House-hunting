import EditContributorPropertyForm from "./edit-form";
import { Suspense } from "react";

export const instant = false;
export default async function EditContributorPropertyPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  return <Suspense fallback={<main className="min-h-screen bg-cream" />}><EditContributorPropertyForm propertyId={propertyId} /></Suspense>;
}
