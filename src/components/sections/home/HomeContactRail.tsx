import { HomeContactRail as HomeContactRailClient } from '@/components/sections/home/HomeContactRail.client';
import { getPublicSettingsMap } from '@/lib/public-settings';
import { CONTACT } from '@/lib/site-content';

export async function HomeContactRail() {
  const settings = await getPublicSettingsMap();
  const whatsapp = settings.platform_whatsapp ?? CONTACT.whatsapp;

  return <HomeContactRailClient whatsapp={whatsapp} />;
}
