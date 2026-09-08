import type { Metadata } from 'next';
import { CarRentalCityPage, generateCarCityMetadata } from '@/features/locations/city-page.server';

export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return generateCarCityMetadata(city);
}

export default CarRentalCityPage;
