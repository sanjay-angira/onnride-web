import type {
  ApiResponse,
  AuthTokens,
  Booking,
  ChatMessage,
  KycStatus,
  Location,
  PaymentOrder,
  PickupPoint,
  PriceBreakdown,
  User,
  Vehicle,
  VehicleBrand,
  VehicleCategory,
  WalletBalance,
  WalletTransaction,
} from '@/types';
import { toRentalApiPayload } from '@/lib/rental-datetime';
import { filterCategoriesByClass } from '@/lib/vehicle-categories';

const PRODUCTION_API_URL = 'https://onnride-backend.onrender.com/api/v1';
const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || PRODUCTION_API_URL;

/** Render cold starts can hang fetch with no timeout and blow Vercel's 60s SSG budget. */
const FETCH_TIMEOUT_MS = 12_000;

export function extractApiErrorMessage(payload: unknown): string {
  if (typeof payload !== 'object' || payload === null) return 'Request failed';
  const obj = payload as Record<string, unknown>;
  if (typeof obj.message === 'string' && obj.message.length > 0) return obj.message;
  if (Array.isArray(obj.message)) return obj.message.map(String).join(', ');
  if (typeof obj.error === 'object' && obj.error !== null) {
    const nested = obj.error as Record<string, unknown>;
    if (typeof nested.message === 'string' && nested.message.length > 0) return nested.message;
  }
  return 'Request failed';
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
  token?: string;
  body?: unknown;
  /** Next.js fetch revalidate seconds for public cached reads */
  revalidate?: number | false;
}

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { token, body, headers, revalidate, signal, ...rest } = options;

  const cacheMode =
    revalidate === false || token
      ? ({ cache: 'no-store' as const })
      : revalidate !== undefined
        ? ({ next: { revalidate } as const })
        : ({ cache: 'no-store' as const });

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...rest,
      ...cacheMode,
      signal: signal ?? AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Network request failed', 0);
  }

  let payload: ApiResponse<T> | { message?: string | string[]; statusCode?: number };

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError('Invalid API response', response.status);
  }

  if (!response.ok) {
    throw new ApiError(extractApiErrorMessage(payload), response.status);
  }

  if ('success' in payload && payload.success === false) {
    throw new ApiError(extractApiErrorMessage(payload), response.status);
  }

  return 'data' in payload ? payload.data : (payload as T);
}

async function safeRequest<T>(
  path: string,
  options?: FetchOptions,
  fallback?: T,
): Promise<T | null> {
  try {
    return await request<T>(path, options);
  } catch {
    return fallback ?? null;
  }
}

const PUBLIC_CACHE = 900;

export interface VehicleSitemapSlug {
  slug: string;
  updatedAt: string;
}

// Locations
export async function getLocations(): Promise<Location[]> {
  return (await safeRequest<Location[]>('/locations', { revalidate: PUBLIC_CACHE }, [])) ?? [];
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  return safeRequest<Location>(`/locations/${slug}`, { revalidate: PUBLIC_CACHE });
}

export async function getPickupPoints(locationSlug: string): Promise<PickupPoint[]> {
  return (
    (await safeRequest<PickupPoint[]>(
      `/locations/${locationSlug}/pickup-points`,
      { revalidate: PUBLIC_CACHE },
      [],
    )) ?? []
  );
}

export interface LocationSeoContent {
  h1: string | null;
  intro: string | null;
  aeoSummary: string | null;
  whyChoose: string[] | null;
  pricingExplainer: string | null;
  documentsHtml: string | null;
  popularRoutes: Array<{ name: string; distance: string; description: string }> | null;
  attractions: Array<{ name: string; description: string; distance?: string }> | null;
  safetyTips: string[] | null;
  areasServed: string[] | null;
  pickupNote: string | null;
  nearbyLocationSlugs: string[] | null;
  relatedBlogSlugs: string[] | null;
}

export interface LocationSeoResponse {
  location: Location;
  content: LocationSeoContent | null;
  keywords: Array<{ keyword: string; intent: string; priority: string }>;
  indexable: boolean;
  vehicleCount: number;
  fourWheelerCount?: number;
}

export interface LocationFaqItem {
  id: string;
  question: string;
  answer: string;
  categoryTag: string;
  sortOrder: number;
}

export interface LocationReviewStats {
  reviewCount: number;
  averageRating: number;
  includeAggregateRating: boolean;
  topReviews: Array<{
    id: string;
    rating: number;
    review: string | null;
    customerName: string | null;
    vehicleModel: string | null;
    createdAt: string;
  }>;
}

export async function getLocationSeo(slug: string): Promise<LocationSeoResponse | null> {
  return safeRequest<LocationSeoResponse>(`/locations/${slug}/seo`, { revalidate: PUBLIC_CACHE });
}

export async function getLocationFaqs(slug: string): Promise<LocationFaqItem[]> {
  return (
    (await safeRequest<LocationFaqItem[]>(
      `/locations/${slug}/faqs`,
      { revalidate: PUBLIC_CACHE },
      [],
    )) ?? []
  );
}

export async function getLocationReviewStats(slug: string): Promise<LocationReviewStats | null> {
  return safeRequest<LocationReviewStats>(`/locations/${slug}/review-stats`, {
    revalidate: PUBLIC_CACHE,
  });
}

export interface PlatformReviewStats {
  reviewCount: number;
  averageRating: number;
  includeAggregateRating: boolean;
  topReviews: Array<{
    id: string;
    rating: number;
    review: string | null;
    customerName: string | null;
    vehicleModel: string | null;
    cityName: string | null;
    createdAt: string;
  }>;
}

export async function getPlatformReviewStats(): Promise<PlatformReviewStats | null> {
  return safeRequest<PlatformReviewStats>('/locations/review-stats/platform', {
    revalidate: PUBLIC_CACHE,
  });
}

export interface LocationCategoryPageResponse {
  location: Location;
  category: { id: string; name: string; slug: string };
  vehicleCount: number;
  lowestDailyRate: number | null;
  indexable: boolean;
  pageMeta: { metaTitle: string | null; metaDescription: string | null; introOverride: string | null } | null;
}

export async function getLocationCategoryPage(
  slug: string,
  categorySlug: string,
): Promise<LocationCategoryPageResponse | null> {
  return safeRequest<LocationCategoryPageResponse>(
    `/locations/${slug}/categories/${categorySlug}`,
    { revalidate: PUBLIC_CACHE },
  );
}

export interface LocationBrandPageResponse {
  location: Location;
  brand: { id: string; name: string; slug: string };
  vehicleCount: number;
  indexable: boolean;
}

export async function getLocationBrandPage(
  slug: string,
  brandSlug: string,
): Promise<LocationBrandPageResponse | null> {
  return safeRequest<LocationBrandPageResponse>(
    `/locations/${slug}/brands/${brandSlug}`,
    { revalidate: PUBLIC_CACHE },
  );
}

export interface LocationAreaPageResponse {
  location: Location;
  area: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
  };
}

export async function getLocationAreaPage(
  slug: string,
  areaSlug: string,
): Promise<LocationAreaPageResponse | null> {
  return safeRequest<LocationAreaPageResponse>(
    `/locations/${slug}/near/${areaSlug}`,
    { revalidate: PUBLIC_CACHE },
  );
}

export async function getLocationAreas(slug: string) {
  return (
    (await safeRequest<
      Array<{ id: string; name: string; slug: string; description: string | null }>
    >(`/locations/${slug}/areas`, { revalidate: PUBLIC_CACHE }, [])) ?? []
  );
}

export interface LocationSitemapEntry {
  slug: string;
  updatedAt: string;
  indexable: boolean;
  categories: Array<{ slug: string; indexable: boolean }>;
  areas: Array<{ slug: string }>;
}

export async function getLocationSitemapEntries(): Promise<LocationSitemapEntry[]> {
  return (
    (await safeRequest<LocationSitemapEntry[]>(
      '/locations/sitemap-seo',
      { revalidate: PUBLIC_CACHE },
      [],
    )) ?? []
  );
}

export async function getVehicleSitemapSlugs(): Promise<VehicleSitemapSlug[]> {
  return (
    (await safeRequest<VehicleSitemapSlug[]>(
      '/vehicles/sitemap-slugs',
      { revalidate: PUBLIC_CACHE },
      [],
    )) ?? []
  );
}

// Vehicles
export interface SearchVehiclesParams {
  locationId: string;
  pickupDate: string;
  pickupTime?: string;
  returnDate: string;
  returnTime?: string;
  categoryId?: string;
  brandId?: string;
  vehicleClass?: import('@/types').VehicleClass;
}

export async function searchVehicles(
  params: SearchVehiclesParams,
  options?: { noCache?: boolean },
): Promise<Vehicle[]> {
  const { pickupDate, returnDate } = toRentalApiPayload(params);
  const query = new URLSearchParams({
    locationId: params.locationId,
    pickupDate,
    returnDate,
    ...(params.categoryId ? { categoryId: params.categoryId } : {}),
    ...(params.brandId ? { brandId: params.brandId } : {}),
    ...(params.vehicleClass ? { vehicleClass: params.vehicleClass } : {}),
  });
  const fetchOptions = options?.noCache
    ? ({ revalidate: false as const })
    : ({ revalidate: 60 });
  return (
    (await safeRequest<Vehicle[]>(
      `/vehicles/search?${query.toString()}`,
      fetchOptions,
      [],
    )) ?? []
  );
}

export async function getVehicle(slugOrId: string): Promise<Vehicle | null> {
  return safeRequest<Vehicle>(`/vehicles/${slugOrId}`, { revalidate: PUBLIC_CACHE });
}

export async function getCategories(
  vehicleClass?: import('@/types').VehicleClass,
  options?: { noCache?: boolean },
): Promise<VehicleCategory[]> {
  const query = vehicleClass ? `?vehicleClass=${vehicleClass}` : '';
  const fetchOptions = options?.noCache
    ? ({ revalidate: false as const })
    : ({ revalidate: PUBLIC_CACHE });

  const api = options?.noCache
    ? await request<VehicleCategory[]>(`/vehicles/categories${query}`, fetchOptions)
    : ((await safeRequest<VehicleCategory[]>(`/vehicles/categories${query}`, fetchOptions)) ?? []);

  return filterCategoriesByClass(api, vehicleClass);
}

export async function getBrands(vehicleClass?: import('@/types').VehicleClass): Promise<VehicleBrand[]> {
  const query = vehicleClass ? `?vehicleClass=${vehicleClass}` : '';
  return (await safeRequest<VehicleBrand[]>(`/vehicles/brands${query}`, { revalidate: PUBLIC_CACHE }, [])) ?? [];
}

export async function calculatePrice(payload: {
  vehicleId: string;
  pickupDate: string;
  pickupTime?: string;
  returnDate: string;
  returnTime?: string;
  couponCode?: string;
  walletAmount?: string;
  doorstepDelivery?: boolean;
  deliveryAddress?: string;
  deliveryLatitude?: string;
  deliveryLongitude?: string;
  extraHelmetCount?: number;
}): Promise<PriceBreakdown> {
  const { pickupDate, returnDate } = toRentalApiPayload(payload);
  return request<PriceBreakdown>('/pricing/calculate', {
    method: 'POST',
    body: {
      vehicleId: payload.vehicleId,
      pickupDate,
      returnDate,
      ...(payload.couponCode ? { couponCode: payload.couponCode } : {}),
      ...(payload.walletAmount ? { walletAmount: payload.walletAmount } : {}),
      ...(payload.doorstepDelivery ? { doorstepDelivery: true } : {}),
      ...(payload.deliveryAddress ? { deliveryAddress: payload.deliveryAddress } : {}),
      ...(payload.deliveryLatitude ? { deliveryLatitude: payload.deliveryLatitude } : {}),
      ...(payload.deliveryLongitude ? { deliveryLongitude: payload.deliveryLongitude } : {}),
      ...(payload.extraHelmetCount ? { extraHelmetCount: payload.extraHelmetCount } : {}),
    },
  });
}

// Auth
export async function sendOtp(phone: string): Promise<{ message: string }> {
  return request<{ message: string }>('/auth/send-otp', {
    method: 'POST',
    body: { phone, role: 'CUSTOMER' },
  });
}

export async function verifyOtp(phone: string, otp: string): Promise<AuthTokens> {
  return request<AuthTokens>('/auth/verify-otp', {
    method: 'POST',
    body: { phone, otp, role: 'CUSTOMER' },
  });
}

// Users
export async function getProfile(token: string): Promise<User | null> {
  return safeRequest<User>('/users/me', { token });
}

export async function updateProfile(
  token: string,
  data: { name?: string; email?: string },
): Promise<User> {
  return request<User>('/users/me', { method: 'PATCH', token, body: data });
}

// Bookings
export interface CreateBookingPayload {
  vehicleId: string;
  pickupDate: string;
  pickupTime?: string;
  returnDate: string;
  returnTime?: string;
  couponCode?: string;
  walletAmount?: string;
  doorstepDelivery?: boolean;
  deliveryAddress?: string;
  deliveryLatitude?: string;
  deliveryLongitude?: string;
  pickupPointId?: string;
  extraHelmetCount?: number;
}

export async function createBooking(
  token: string,
  payload: CreateBookingPayload,
): Promise<Booking> {
  const { pickupDate, returnDate } = toRentalApiPayload(payload);
  return request<Booking>('/bookings', {
    method: 'POST',
    token,
    body: {
      vehicleId: payload.vehicleId,
      pickupDate,
      returnDate,
      ...(payload.couponCode ? { couponCode: payload.couponCode } : {}),
      ...(payload.walletAmount ? { walletAmount: payload.walletAmount } : {}),
      ...(payload.doorstepDelivery ? { doorstepDelivery: true } : {}),
      ...(payload.deliveryAddress ? { deliveryAddress: payload.deliveryAddress } : {}),
      ...(payload.deliveryLatitude ? { deliveryLatitude: payload.deliveryLatitude } : {}),
      ...(payload.deliveryLongitude ? { deliveryLongitude: payload.deliveryLongitude } : {}),
      ...(payload.pickupPointId ? { pickupPointId: payload.pickupPointId } : {}),
      ...(payload.extraHelmetCount ? { extraHelmetCount: payload.extraHelmetCount } : {}),
    },
  });
}

export async function getMyBookings(token: string): Promise<Booking[]> {
  return (await safeRequest<Booking[]>('/bookings/me', { token }, [])) ?? [];
}

export async function cancelBooking(
  token: string,
  bookingId: string,
  reason?: string,
): Promise<{
  booking: Booking;
  cancellation: { refundEligible: boolean; forfeitedAmount: number; message: string };
}> {
  return request(`/bookings/${bookingId}/cancel`, {
    method: 'PATCH',
    token,
    body: reason ? { reason } : {},
  });
}

export async function getBooking(token: string, id: string): Promise<Booking | null> {
  return safeRequest<Booking>(`/bookings/${id}`, { token });
}

// Payments
export async function createPaymentOrder(
  token: string,
  bookingId: string,
  paymentMode: 'FULL' | 'PARTIAL' = 'FULL',
): Promise<PaymentOrder> {
  return request<PaymentOrder>(`/payments/bookings/${bookingId}/order`, {
    method: 'POST',
    token,
    body: { paymentMode },
  });
}

export async function verifyPayment(
  token: string,
  bookingId: string,
  payload: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  },
): Promise<{ success: boolean; bookingId: string }> {
  return request(`/payments/bookings/${bookingId}/verify`, {
    method: 'POST',
    token,
    body: { bookingId, ...payload },
  });
}

export async function completeMockPayment(
  token: string,
  bookingId: string,
): Promise<{ success: boolean; mock?: boolean }> {
  return request(`/payments/bookings/${bookingId}/mock-complete`, {
    method: 'POST',
    token,
    body: {},
  });
}

export async function getPaymentByBooking(
  token: string,
  bookingId: string,
): Promise<{ status: string; amount: string } | null> {
  return safeRequest(`/payments/bookings/${bookingId}`, { token });
}

// Wallet
export async function getWalletBalance(token: string): Promise<WalletBalance | null> {
  return safeRequest<WalletBalance>('/wallet/balance', { token });
}

export async function getWalletTransactions(token: string): Promise<WalletTransaction[]> {
  return (await safeRequest<WalletTransaction[]>('/wallet/transactions', { token }, [])) ?? [];
}

// KYC
export async function getKycStatus(token: string): Promise<KycStatus | null> {
  return safeRequest<KycStatus>('/kyc/status', { token });
}

export interface UploadKycPayload {
  aadhaarNumber?: string;
  drivingLicenseNumber?: string;
  licenseClass?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
  dlFront?: string;
  dlBack?: string;
  selfie?: string;
}

export async function uploadKyc(token: string, payload: UploadKycPayload): Promise<KycStatus> {
  return request<KycStatus>('/kyc/upload', { method: 'POST', token, body: payload });
}

// Chat
export async function getBookingChatMessages(
  token: string,
  bookingId: string,
): Promise<ChatMessage[]> {
  return (await safeRequest<ChatMessage[]>(
    `/chats/bookings/${bookingId}/messages`,
    { token },
    [],
  )) ?? [];
}

export async function sendBookingChatMessage(
  token: string,
  bookingId: string,
  content: string,
): Promise<ChatMessage> {
  return request<ChatMessage>(`/chats/bookings/${bookingId}/messages`, {
    method: 'POST',
    token,
    body: { content },
  });
}

// Coupons
export async function validateCoupon(
  token: string,
  code: string,
  orderAmount: string,
): Promise<{ valid: boolean; discountAmount?: string; message?: string }> {
  return request('/coupons/validate', {
    method: 'POST',
    token,
    body: { code, orderAmount },
  });
}

export { API_URL, request };
