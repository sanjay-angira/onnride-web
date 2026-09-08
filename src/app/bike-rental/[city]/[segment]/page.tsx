import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import {
  getLocationBrandPage,
  getLocationCategoryPage,
  getLocations,
} from '@/lib/api';
import {
  bikeRentalCategoryPath,
  bikeRentalCityPath,
  isCategorySegment,
  resolveCategorySlug,
} from '@/lib/bike-rental-paths';
import { pageMetadata } from '@/lib/seo/metadata';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  rentalQueryString,
} from '@/lib/rental-datetime';

export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string; segment: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, segment } = await params;
  const categorySlug = resolveCategorySlug(segment);

  if (isCategorySegment(segment)) {
    const data = await getLocationCategoryPage(city, categorySlug);
    if (!data) return { title: 'Not found' };
    const title =
      data.pageMeta?.metaTitle ??
      `${data.category.name} Rental in ${data.location.name} | OnnRide`;
    const description =
      data.pageMeta?.metaDescription ??
      `Rent ${data.category.name.toLowerCase()} in ${data.location.name} from verified vendors. ${data.vehicleCount} vehicles available — compare live rates.`;
    return pageMetadata({
      title,
      description,
      path: bikeRentalCategoryPath(city, categorySlug),
      noindex: !data.indexable,
    });
  }

  const brandData = await getLocationBrandPage(city, segment);
  if (!brandData) return { title: 'Not found' };
  return pageMetadata({
    title: `${brandData.brand.name} Rental in ${brandData.location.name} | OnnRide`,
    description: `Rent ${brandData.brand.name} bikes in ${brandData.location.name}. Compare verified vendors on OnnRide.`,
    path: `/bike-rental/${city}/${segment}`,
    noindex: !brandData.indexable,
  });
}

export default async function SegmentPage({ params }: Props) {
  const { city, segment } = await params;

  if (segment === 'near') {
    notFound();
  }

  const categorySlug = resolveCategorySlug(segment);

  if (isCategorySegment(segment)) {
    const [data, locations] = await Promise.all([
      getLocationCategoryPage(city, categorySlug),
      getLocations(),
    ]);
    if (!data) notFound();

    const dates = {
      pickup: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      ret: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      pickupTime: DEFAULT_PICKUP_TIME,
      returnTime: DEFAULT_RETURN_TIME,
    };

    const searchHref = `/search?locationId=${data.location.id}&vehicleClass=two_wheeler&category=${categorySlug}&${rentalQueryString({
      pickupDate: dates.pickup,
      pickupTime: dates.pickupTime,
      returnDate: dates.ret,
      returnTime: dates.returnTime,
      location: city,
    })}`;

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
              <Link href="/bike-rental" className="hover:text-brand-600">
                Bike rental
              </Link>
            </li>
            <li>
              <ChevronRight className="mx-1 inline h-4 w-4" />
            </li>
            <li>
              <Link href={bikeRentalCityPath(city)} className="hover:text-brand-600">
                {data.location.name}
              </Link>
            </li>
            <li>
              <ChevronRight className="mx-1 inline h-4 w-4" />
            </li>
            <li>
              <span className="text-slate-700">{data.category.name}</span>
            </li>
          </ol>
        </nav>

        <div className="section-container py-12">
          <h1 className="font-display text-3xl font-bold text-surface-900 sm:text-4xl">
            {data.category.name} rental in {data.location.name}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            {data.pageMeta?.introOverride ??
              `Browse ${data.category.name.toLowerCase()} from verified vendors in ${data.location.name}. Daily rates shown live — no hardcoded prices.`}
          </p>
          {data.lowestDailyRate !== null ? (
            <p className="mt-2 text-sm font-medium text-brand-700">
              From ₹{Math.round(data.lowestDailyRate)}/day · {data.vehicleCount} available
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              {data.vehicleCount} {data.category.name.toLowerCase()} listed
            </p>
          )}

          <div className="mt-8 max-w-4xl">
            <HomeSearchForm
              locations={locations}
              defaultLocationId={data.location.id}
              defaultVehicleClass="TWO_WHEELER"
              variant="hero"
            />
          </div>

          <Link
            href={searchHref}
            className="mt-8 inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
          >
            See all {data.category.name.toLowerCase()} in {data.location.name} →
          </Link>
        </div>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://onnride.com' },
                { '@type': 'ListItem', position: 2, name: 'Bike rental', item: 'https://onnride.com/bike-rental' },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: data.location.name,
                  item: `https://onnride.com/bike-rental/${city}`,
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: data.category.name,
                  item: `https://onnride.com/bike-rental/${city}/${categorySlug}`,
                },
              ],
            }),
          }}
        />
      </>
    );
  }

  // Brand page (phase 3)
  const brandData = await getLocationBrandPage(city, segment);
  if (!brandData) notFound();

  if (!brandData.indexable) {
    redirect(bikeRentalCityPath(city));
  }

  const searchHref = `/search?locationId=${brandData.location.id}&brandId=${brandData.brand.id}`;

  return (
    <div className="section-container py-12">
      <h1 className="font-display text-3xl font-bold text-surface-900">
        {brandData.brand.name} rental in {brandData.location.name}
      </h1>
      <p className="mt-4 text-slate-600">
        {brandData.vehicleCount} {brandData.brand.name} bikes from verified vendors.
      </p>
      <Link
        href={searchHref}
        className="mt-8 inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
      >
        Browse {brandData.brand.name} →
      </Link>
    </div>
  );
}
