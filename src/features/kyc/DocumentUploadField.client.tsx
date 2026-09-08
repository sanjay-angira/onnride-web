'use client';

import { useId, useRef } from 'react';
import { Camera, FileUp, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentUploadFieldProps {
  label: string;
  hint?: string;
  file: File | null;
  previewUrl?: string | null;
  uploading?: boolean;
  onChange: (file: File | null) => void;
  accept?: string;
}

export function DocumentUploadField({
  label,
  hint,
  file,
  previewUrl,
  uploading = false,
  onChange,
  accept = 'image/jpeg,image/png,image/webp,image/gif,application/pdf',
}: DocumentUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const showPreview = previewUrl && (file?.type.startsWith('image/') || previewUrl.match(/\.(jpe?g|png|webp|gif)(\?|$)/i));

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border-2 border-dashed transition',
          file || previewUrl ? 'border-brand-300 bg-brand-50/40' : 'border-slate-200 bg-slate-50 hover:border-brand-300',
        )}
      >
        {showPreview ? (
          <div className="relative aspect-[4/3] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl!} alt={label} className="h-full w-full object-cover" />
            {!uploading ? (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                aria-label={`Remove ${label}`}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : file?.type === 'application/pdf' ? (
          <div className="flex items-center gap-3 px-4 py-6">
            <FileUp className="h-8 w-8 text-brand-500" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">PDF selected</p>
            </div>
            {!uploading ? (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200"
                aria-label={`Remove ${label}`}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className="flex cursor-pointer flex-col items-center justify-center px-4 py-8 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-brand-500" aria-hidden />
              ) : (
                <Camera className="h-6 w-6 text-brand-500" aria-hidden />
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-slate-800">
              {uploading ? 'Uploading…' : 'Tap to upload photo'}
            </p>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG or PDF · max 5 MB</p>
          </label>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          className="sr-only"
          disabled={uploading}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
