import { SupportFab } from '@/components/support/SupportFab.client';
import { getPublicSettingsMap } from '@/lib/public-settings';
import { CONTACT } from '@/lib/site-content';

export async function SupportFabWrapper() {
  const settings = await getPublicSettingsMap();
  const phone = settings.platform_phone ?? CONTACT.phone;
  const whatsapp = settings.platform_whatsapp ?? CONTACT.whatsapp;

  return <SupportFab phone={phone} whatsapp={whatsapp} />;
}
