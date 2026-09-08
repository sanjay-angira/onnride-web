'use client';

import { Facebook, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT } from '@/lib/site-content';
import { waHref } from '@/lib/location-seo';
import { cn } from '@/lib/utils';

interface HomeContactRailProps {
  whatsapp?: string;
  className?: string;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type RailItem = {
  id: string;
  label: string;
  icon: LucideIcon | typeof WhatsAppIcon;
  iconClassName: string;
  tabClassName: string;
  href: string;
};

const TAB = 'h-12 w-12';

export function HomeContactRail({
  whatsapp = CONTACT.whatsapp,
  className,
}: HomeContactRailProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const railItems: RailItem[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: WhatsAppIcon,
      iconClassName: 'text-[#25D366] md:text-white',
      tabClassName: 'md:bg-[#25D366] md:text-white md:hover:bg-[#20bd5a]',
      href: waHref(whatsapp, 'Hi OnnRide, I need help booking a bike.'),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      iconClassName: 'text-[#dd2a7b] md:text-white',
      tabClassName:
        'md:bg-gradient-to-br md:from-[#f58529] md:via-[#dd2a7b] md:to-[#8134af] md:text-white md:hover:opacity-95',
      href: CONTACT.social.instagram,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      iconClassName: 'text-[#1877F2] md:text-white',
      tabClassName: 'md:bg-[#1877F2] md:text-white md:hover:bg-[#166fe5]',
      href: CONTACT.social.facebook,
    },
  ];

  if (!mounted) return null;

  const rail = (
    <nav
      aria-label="Quick contact and social links"
      className={cn(
        'fixed right-0 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-2 overflow-visible md:flex',
        className,
      )}
    >
      {railItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className={cn('group relative block shrink-0 overflow-visible', TAB)}
          >
            <span
              className={cn(
                'absolute right-0 top-0 flex items-center rounded-l-full bg-transparent shadow-none ring-0',
                TAB,
                'w-12 transition-[width] duration-200 ease-out',
                'md:shadow-lg md:ring-1 md:ring-black/10',
                'group-hover:z-50 md:group-hover:w-[10rem]',
                item.tabClassName,
              )}
            >
              <span
                className={cn(
                  'hidden min-w-0 flex-1 truncate text-xs font-bold whitespace-nowrap md:block',
                  'max-w-0 pl-0 opacity-0',
                  'transition-[max-width,padding,opacity] duration-200 ease-out',
                  'group-hover:max-w-[6.5rem] group-hover:pl-4 group-hover:opacity-100',
                )}
              >
                {item.label}
              </span>
              <span className={cn(TAB, 'flex shrink-0 items-center justify-center')}>
                <Icon className={cn('h-5 w-5 shrink-0', item.iconClassName)} />
              </span>
            </span>
          </a>
        );
      })}
    </nav>
  );

  return createPortal(rail, document.body);
}
