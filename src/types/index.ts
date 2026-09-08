export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  state: string | null;
  country: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  heroImageUrl: string | null;
  displayImages?: ImageVariants | null;
  supportPhone: string | null;
  seoTier?: string;
  launchStatus?: string;
  primaryKeyword?: string | null;
}

export interface PickupPoint {
  id: string;
  locationId: string;
  name: string;
  slug: string;
  address: string | null;
  latitude: string;
  longitude: string;
  sortOrder: number;
}

export interface VendorHub {
  id: string;
  vendorId?: string;
  locationId?: string;
  name: string;
  description: string | null;
  address: string | null;
  latitude?: string | null;
  longitude?: string | null;
  isActive?: boolean;
  location?: Pick<Location, 'id' | 'name' | 'slug'>;
}

export type VehicleClass = 'TWO_WHEELER' | 'FOUR_WHEELER';

export interface VehicleCategory {
  id: string;
  name: string;
  slug: string;
  vehicleClass?: VehicleClass;
  icon?: string | null;
  displayImages?: ImageVariants | null;
}

export interface VehicleBrand {
  id: string;
  name: string;
  slug: string;
  vehicleClass?: VehicleClass;
  logo?: string | null;
  displayImages?: ImageVariants | null;
}

export type ImageVariantKey = 'thumb' | 'w300' | 'w900' | 'w1200';
export type ImageVariants = Record<ImageVariantKey, string>;

export interface VehicleImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface VehiclePublishedReview {
  id: string;
  rating: number;
  review: string | null;
  authorName: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  slug: string | null;
  vendorId: string;
  locationId: string;
  categoryId: string;
  brandId: string;
  vehicleClass?: VehicleClass;
  transmissionType?: string | null;
  seats?: number | null;
  model: string | null;
  registrationNumber: string;
  pricePerDay: string;
  securityDeposit: string;
  description: string | null;
  doorstepDelivery?: boolean;
  roadsideAssistance?: boolean;
  hubId?: string | null;
  hub?: VendorHub | null;
  status: string;
  year?: number | null;
  color?: string | null;
  fuelType?: string | null;
  engineCc?: number | null;
  images?: VehicleImage[];
  displayImages?: ImageVariants | null;
  modelDisplayImages?: ImageVariants | null;
  mediaImages?: unknown[];
  modelMediaImages?: unknown[];
  /** Search listing stats (from GET /vehicles/search) */
  avgRating?: number | null;
  reviewCount?: number;
  /** Published reviews for SEO (from GET /vehicles/:slug) */
  publishedReviews?: VehiclePublishedReview[];
  tripCount?: number;
  isTopHost?: boolean;
  category?: VehicleCategory;
  brand?: VehicleBrand;
  location?: Location;
}

export interface User {
  id: string;
  phone: string;
  role: string;
  name: string | null;
  email?: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface BookingVendor {
  id: string;
  businessName: string;
  user?: { name?: string | null; phone?: string | null };
}

export interface BookingStatusHistoryItem {
  id: string;
  oldStatus: string | null;
  newStatus: string;
  createdAt: string;
  reason?: string | null;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  vendorId: string;
  vehicleId: string;
  pickupDate: string;
  returnDate: string;
  bookingStatus: string;
  totalAmount: string;
  securityDeposit: string;
  amountPaid?: string;
  pendingBalance?: string;
  discountAmount?: string;
  totalDays?: number;
  createdAt?: string;
  doorstepDelivery?: boolean;
  deliveryAddress?: string | null;
  deliveryDistanceKm?: string | null;
  deliveryCharge?: string;
  extraHelmetCount?: number;
  extraHelmetCharge?: string;
  pickupPointId?: string | null;
  pickupPoint?: PickupPoint | null;
  pickupLocation?: Pick<
    Location,
    'id' | 'name' | 'slug' | 'latitude' | 'longitude' | 'state' | 'supportPhone'
  > | null;
  returnLocation?: Pick<
    Location,
    'id' | 'name' | 'slug' | 'latitude' | 'longitude' | 'state'
  > | null;
  deliveryLatitude?: string | null;
  deliveryLongitude?: string | null;
  vehicle?: Vehicle;
  vendor?: BookingVendor;
  statusHistory?: BookingStatusHistoryItem[];
}

export interface ChatMessage {
  id: string;
  content: string | null;
  senderRole: 'CUSTOMER' | 'VENDOR' | 'PLATFORM';
  senderId: string;
  createdAt: string;
  attachmentUrl?: string | null;
}

export interface WalletBalance {
  balance: string;
  currency?: string;
}

export interface WalletTransaction {
  id: string;
  type: string;
  amount: string;
  description: string | null;
  createdAt: string;
}

export interface KycStatus {
  id?: string;
  status: string;
  rejectionReason?: string | null;
  aadhaarNumber?: string | null;
  drivingLicenseNumber?: string | null;
  licenseClass?: string | null;
  aadhaarFront?: string | null;
  aadhaarBack?: string | null;
  dlFront?: string | null;
  dlBack?: string | null;
  selfie?: string | null;
}

export interface PriceBreakdown {
  baseDailyRate: number;
  durationDays: number;
  subtotal: number;
  multipliers: Record<string, number>;
  subtotalAdjusted: number;
  couponDiscount: number;
  walletApplied: number;
  taxAmount: number;
  rentalTotal?: number;
  doorstepDelivery?: boolean;
  deliveryDistanceKm?: number;
  deliveryRatePerKm?: number;
  deliveryCharge?: number;
  extraHelmetCount?: number;
  extraHelmetPricePerDay?: number;
  extraHelmetCharge?: number;
  totalAmount: number;
  securityDeposit: number;
  securityDepositRule?: string;
  engineCc?: number | null;
  amountDueNow: number;
  partialPayment?: {
    enabled: boolean;
    eligible: boolean;
    payNowAmount: number;
    pendingBalance: number;
    ruleApplied: string | null;
    mode: string;
  };
}

export interface PaymentOrder {
  paymentId: string;
  orderId: string;
  amount: number;
  fullDue?: number;
  pendingBalance?: number;
  paymentMode?: 'FULL' | 'PARTIAL' | 'BALANCE';
  ruleApplied?: string | null;
  currency: string;
  keyId: string;
}
