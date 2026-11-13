import PropertyDetail from "@/components/properties/property-detail";

export default async function PropertyPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  return <PropertyDetail propertyId={propertyId} />;
}
