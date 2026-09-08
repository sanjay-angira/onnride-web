import { API_URL } from '@/lib/api';

export interface PublicSetting {
  key: string;
  value: string;
}

export async function getPublicSettingsMap(): Promise<Record<string, string>> {
  try {
    const response = await fetch(`${API_URL}/settings/public`, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(12_000),
    }).catch(() => null);
    if (!response?.ok) return {};
    const payload = (await response.json()) as {
      success?: boolean;
      data?: PublicSetting[];
    };
    const rows = payload.data ?? [];
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch {
    return {};
  }
}

export function settingBool(map: Record<string, string>, key: string, fallback = false): boolean {
  const value = map[key];
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
}
