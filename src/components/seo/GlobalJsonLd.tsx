import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { buildOrganizationGraph } from '@/lib/seo/organization';

export async function GlobalJsonLd() {
  return <JsonLdScript data={buildOrganizationGraph()} />;
}
