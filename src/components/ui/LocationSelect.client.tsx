'use client';

import { ChevronDown, MapPin } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import type { Location } from '@/types';

interface LocationSelectProps {
  locations: Location[];
  value: string;
  onChange: (location: Location | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  'aria-label'?: string;
  /** Room on the right inside the trigger for a chevron when a sibling action button sits outside */
  actionOffset?: boolean;
  disabled?: boolean;
}

function formatLocationLabel(location: Location): string {
  return location.state ? `${location.name}, ${location.state}` : location.name;
}

export function LocationSelect({
  locations,
  value,
  onChange,
  placeholder = 'Select City',
  className,
  id,
  'aria-label': ariaLabel,
  actionOffset = true,
  disabled = false,
}: LocationSelectProps) {
  const fallbackId = useId();
  const triggerId = id ?? fallbackId;
  const listboxId = `${triggerId}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  const selected = locations.find((item) => item.id === value) ?? null;

  const close = useCallback(() => setOpen(false), []);

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  const openMenu = useCallback(() => {
    if (disabled) return;
    updateMenuPosition();
    setOpen(true);
  }, [disabled, updateMenuPosition]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      close();
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const onReposition = () => updateMenuPosition();

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [close, open, updateMenuPosition]);

  function handleSelect(location: Location) {
    onChange(location);
    close();
  }

  function handleClear() {
    onChange(null);
    close();
  }

  const menu =
    open && menuStyle ? (
      <ul
        ref={menuRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={triggerId}
        style={{
          position: 'fixed',
          top: menuStyle.top,
          left: menuStyle.left,
          width: menuStyle.width,
        }}
        className="dropdown-panel"
      >
        {locations.length === 0 ? (
          <li className="px-4 py-3 text-sm text-slate-500">No cities available right now</li>
        ) : (
          <>
            {value ? (
              <li role="presentation">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-500 transition hover:bg-surface-50"
                >
                  {placeholder}
                </button>
              </li>
            ) : null}
            {locations.map((location) => {
              const active = location.id === value;
              return (
                <li key={location.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => handleSelect(location)}
                    className={cn(
                      'w-full px-4 py-2.5 text-left text-sm transition',
                      active
                        ? 'bg-brand-50 font-semibold text-brand-700'
                        : 'text-surface-800 hover:bg-surface-50 hover:text-brand-600',
                    )}
                  >
                    {formatLocationLabel(location)}
                  </button>
                </li>
              );
            })}
          </>
        )}
      </ul>
    ) : null;

  return (
    <div ref={containerRef} className={cn('relative min-w-0', className)}>
      <MapPin
        className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-brand-500"
        aria-hidden
      />
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        disabled={disabled}
        aria-label={ariaLabel ?? 'Select city'}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        onClick={() => (open ? close() : openMenu())}
        className={cn(
          'dropdown-trigger h-12 w-full text-sm',
          'pl-10',
          actionOffset ? 'pr-10' : 'pr-10',
          !selected && 'text-muted-foreground',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {selected ? formatLocationLabel(selected) : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {mounted && menu ? createPortal(menu, document.body) : null}
    </div>
  );
}
