import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getLocationAreaPage, getLocations } from '@/lib/api';
import { carRentalCityPath, carRentalNearPath } from '@/lib/car-rental-paths';
import { pageMetadata } from '@/lib/seo/metadata';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';

export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string; area: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, area } = await params;
  const data = await getLocationAreaPage(city, area);
  if (!data) return { title: 'Not found' };
  const title =
    data.area.metaTitle ??
    `Car Rental near ${data.area.name}, ${data.location.name} | OnnRide`;
  const description =
    data.area.metaDescription ??
    data.area.description ??
    `Rent a car near ${data.area.name} in ${data.location.name} from verified OnnRide vendors.`;
  return pageMetadata({
    title,
    description,
    path: carRentalNearPath(city, area),
  });
}

export default async function CarNearAreaPage({ params }: Props) {
  const { city, area } = await params;
  const [data, locations] = await Promise.all([
    getLocationAreaPage(city, area),
    getLocations(),
  ]);
  if (!data) notFound();

  return (
    <>
      <nav className="border-b border-surface-200 bg-surface-50/80">
        <ol className="section-container flex flex-wrap items-center gap-1 py-3 text-sm text-slate-500">
          <li>
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="mx-1 inline h-4 w-4" />
          </li>
          <li>
            <Link href="/car-rental" className="hover:text-brand-600">
              Car rental
            </Link>
          </li>
          <li>
            <ChevronRight className="mx-1 inline h-4 w-4" />
          </li>
          <li>
            <Link href={carRentalCityPath(city)} className="hover:text-brand-600">
              {data.location.name}
            </Link>
          </li>
          <li>
            <ChevronRight className="mx-1 inline h-4 w-4" />
          </li>
          <li>
            <span className="text-slate-700">Near {data.area.name}</span>
          </li>
        </ol>
      </nav>

      <div className="section-container py-12">
        <h1 className="font-display text-3xl font-bold text-surface-900">
          Car rental near {data.area.name}, {data.location.name}
        </h1>
        {data.area.description ? (
          <p className="mt-4 max-w-2xl text-slate-600">{data.area.description}</p>
        ) : null}

        <div className="mt-8 max-w-4xl">
          <HomeSearchForm
            locations={locations}
            defaultLocationId={data.location.id}
            defaultVehicleClass="FOUR_WHEELER"
            variant="hero"
          />
        </div>
      </div>
    </>
  );
}
