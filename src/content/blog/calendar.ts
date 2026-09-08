/** 100-topic SEO manifest — published vs planned for months 4–12. */
import { ALL_BLOG_POSTS } from './index';

export type CalendarEntry = {
  id: string;
  slug: string;
  title: string;
  priority: 'A' | 'B' | 'C' | 'D';
  week?: string;
  published: boolean;
};

const publishedSlugs = new Set(ALL_BLOG_POSTS.map((p) => p.slug));

function entry(
  id: string,
  slug: string,
  title: string,
  priority: CalendarEntry['priority'],
  week?: string,
): CalendarEntry {
  return { id, slug, title, priority, week, published: publishedSlugs.has(slug) };
}

/** Priority A — revenue intent (20) */
export const PRIORITY_A_TOPICS: CalendarEntry[] = [
  entry('A1', 'bike-rental-chandigarh-prices-booking', 'Bike rental Chandigarh — prices & booking', 'A', 'W1'),
  entry('A2', 'royal-enfield-rental-manali', 'Royal Enfield rental Manali', 'A', 'W2'),
  entry('A3', 'manali-to-leh-highway-guide', 'Bike rental Manali to Leh', 'A', 'W5'),
  entry('A4', 'bike-rental-tricity-mohali-panchkula', 'Scooter rental Chandigarh / Tricity', 'A', 'W4'),
  entry('A5', 'bike-rental-tricity-mohali-panchkula', 'Bike rental Mohali / Panchkula Tricity', 'A', 'W4'),
  entry('A6', 'leh-ladakh-bike-trip-complete-guide', 'Leh Ladakh bike trip rental guide', 'A', 'W3'),
  entry('A7', 'bike-rental-shimla', 'Bike rental Shimla', 'A', 'W4'),
  entry('A8', 'bike-rental-amritsar', 'Bike rental Amritsar Golden Temple', 'A', 'W6'),
  entry('A9', 'himalayan-rental-manali', 'Himalayan rental Manali', 'A', 'W7'),
  entry('A10', 'bike-rental-delhi-manali', 'Bike rental Delhi to Manali', 'A', 'W9'),
  entry('A11', 'bike-rental-kasol-kullu', 'Bike rental Kasol / Kullu', 'A', 'W8'),
  entry('A12', 'punjab-bike-rental-travel-guide', 'Self-drive bike rental Punjab', 'A', 'W6'),
  entry('A13', 'bike-rental-chandigarh-airport', 'Bike rental near Chandigarh airport', 'A', 'W10'),
  entry('A14', 'bike-rental-sector-17-chandigarh', 'Bike rental Sector 17 Chandigarh', 'A', 'W10'),
  entry('A15', 'manali-bike-rental-price-2026', 'Manali bike rental price per day 2026', 'A', 'W2'),
  entry('A16', 'ladakh-bike-rental-permit-documents', 'Ladakh bike rental permit & documents', 'A', 'W3'),
  entry('A17', 'bike-rental-rishikesh', 'Bike rental Rishikesh', 'A', 'W9'),
  entry('A18', 'bike-rental-dehradun-mussoorie', 'Bike rental Dehradun / Mussoorie', 'A', 'W12'),
  entry('A19', 'best-bike-leh-ladakh-rental', 'Best bike for Leh Ladakh rental', 'A', 'W3'),
  entry('A20', 'onnride-vs-local-bike-rental', 'OnnRide vs local rental shops', 'A', 'W12'),
];

/** Remaining 61 topics (B/C/D) — planned for months 4–12 */
export const PLANNED_TOPICS: CalendarEntry[] = [
  entry('B21', 'compare-activa-jupiter-rental', 'Activa vs Jupiter for rental', 'B'),
  entry('B22', 'compare-pulsar-apache-rental', 'Pulsar vs Apache for rental', 'B'),
  entry('B23', 'compare-classic-meteor-rental', 'Classic 350 vs Meteor for touring', 'B'),
  entry('B24', 'classic-350-vs-meteor-rental', 'Classic 350 vs Meteor rental comparison', 'B', 'W7'),
  entry('B25', 'compare-himalayan-390-adventure-rental', 'Himalayan vs 390 Adventure rental', 'B'),
  entry('B26', 'leh-ladakh-trip-budget-breakdown', 'Ladakh trip cost breakdown', 'B', 'W5'),
  entry('B31', 'outstation-bike-rental-punjab-hp', 'Outstation rules Punjab to HP', 'B', 'W6'),
  entry('B33', 'bike-rental-documents-india', 'KYC documents list for bike rental', 'B', 'W2'),
  entry('B34', 'bike-rental-cancellation-refund', 'Cancellation & refund policy', 'B', 'W9'),
  entry('B36', 'best-time-manali-bike', 'Best time to visit Manali by bike', 'B', 'W13'),
  entry('B38', 'monsoon-bike-riding-himachal', 'Monsoon riding Himachal', 'B', 'W12'),
  entry('B39', 'rohtang-pass-bike-rules-2026', 'Rohtang pass rules 2026', 'B', 'W8'),
  entry('B41', 'chandigarh-to-manali-bike-route-guide', 'Chandigarh to Manali route guide', 'B', 'W1'),
  entry('B42', 'chandigarh-to-shimla-bike-route', 'Chandigarh to Shimla route', 'B', 'W4'),
  entry('B44', 'manali-to-leh-highway-guide', 'Manali to Leh highway guide', 'B', 'W5'),
  entry('C46', 'ladakh-bike-packing-list', 'Packing list Ladakh bike trip', 'C', 'W11'),
  entry('C51', 'altitude-sickness-ladakh-bike', 'Altitude sickness prevention Ladakh', 'C', 'W11'),
  entry('C52', 'manali-leh-fuel-stations', 'Fuel stations Manali to Leh', 'C', 'W10'),
  entry('C56', 'spiti-valley-bike-trip', 'Spiti valley bike trip intro', 'C', 'W13'),
  entry('C61', 'bike-inspection-before-ride', 'Pre-ride inspection checklist', 'C', 'W7'),
  entry('D76', 'history-motorcycle-touring-india', 'History of motorcycle touring India', 'D'),
  entry('D96', 'bike-rental-glossary-india', 'Bike rental glossary India', 'D'),
  entry('D100', 'top-50-bike-routes-india', 'Top 50 bike routes India', 'D'),
];

export const CONTENT_CALENDAR: CalendarEntry[] = [...PRIORITY_A_TOPICS, ...PLANNED_TOPICS];

export function getPublishedCount(): number {
  return ALL_BLOG_POSTS.length;
}

export function getPlannedCount(): number {
  return CONTENT_CALENDAR.filter((e) => !e.published).length;
}
