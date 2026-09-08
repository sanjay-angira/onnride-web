import { onnrideVsFreedo } from './onnride-vs-freedo';
import { onnrideVsOnnBikes } from './onnride-vs-onn-bikes';
import { onnrideVsRentnhop } from './onnride-vs-rentnhop';
import { onnrideVsRentrip } from './onnride-vs-rentrip';
import type { ComparePage } from './types';

export const COMPARE_PAGES: ComparePage[] = [
  onnrideVsOnnBikes,
  onnrideVsRentrip,
  onnrideVsFreedo,
  onnrideVsRentnhop,
];

export function getComparePage(slug: string): ComparePage | undefined {
  return COMPARE_PAGES.find((page) => page.slug === slug);
}

export function getAllCompareSlugs(): string[] {
  return COMPARE_PAGES.map((page) => page.slug);
}

export type { ComparePage, CompareRow, CompareFaq, CompareCell } from './types';
