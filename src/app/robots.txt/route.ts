import { NextResponse } from 'next/server';
import { absoluteUrl } from '@/lib/seo/site-url';

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /login',
    'Disallow: /bookings',
    'Disallow: /checkout',
    'Disallow: /profile',
    'Disallow: /wallet',
    'Disallow: /api/',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
    '# LLM / AI crawler information',
    `# ${absoluteUrl('/llms.txt')}`,
    '',
  ].join('\n');

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
