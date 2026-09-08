'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, IdCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DocumentUploadField } from '@/features/kyc/DocumentUploadField.client';
import { getKycStatus, uploadKyc } from '@/lib/api';
import { uploadKycFile } from '@/lib/kyc-upload';
import type { KycStatus } from '@/types';
import { cn } from '@/lib/utils';

const LICENSE_CLASSES = [
  { value: 'LMV', label: 'LMV — Cars' },
  { value: 'MCWG', label: 'MCWG — Bikes with gear' },
  { value: 'MCWOG', label: 'MCWOG — Bikes without gear' },
  { value: 'OTHER', label: 'Other' },
] as const;

interface KycUploadFormProps {
  token: string;
  bookingId?: string;
  onSubmitted?: (kyc: KycStatus) => void;
}

type DocKey = 'aadhaarFront' | 'aadhaarBack' | 'dlFront' | 'dlBack';

const DOC_FIELDS: { key: DocKey; label: string; hint?: string }[] = [
  { key: 'aadhaarFront', label: 'Aadhaar — front', hint: 'Clear photo of name & photo side' },
  { key: 'aadhaarBack', label: 'Aadhaar — back', hint: 'Address and QR side' },
  { key: 'dlFront', label: 'Driving license — front' },
  { key: 'dlBack', label: 'Driving license — back' },
];

export function KycUploadForm({ token, bookingId, onSubmitted }: KycUploadFormProps) {
  const router = useRouter();
  const [existing, setExisting] = useState<KycStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [licenseClass, setLicenseClass] = useState('MCWG');

  const [files, setFiles] = useState<Record<DocKey, File | null>>({
    aadhaarFront: null,
    aadhaarBack: null,
    dlFront: null,
    dlBack: null,
  });

  const [urls, setUrls] = useState<Record<DocKey, string | null>>({
    aadhaarFront: null,
    aadhaarBack: null,
    dlFront: null,
    dlBack: null,
  });

  const [uploadingKey, setUploadingKey] = useState<DocKey | null>(null);

  useEffect(() => {
    void getKycStatus(token).then((data) => {
      if (data) {
        setExisting(data);
        setAadhaarNumber(data.aadhaarNumber ?? '');
        setDlNumber(data.drivingLicenseNumber ?? '');
        setLicenseClass(data.licenseClass ?? 'MCWG');
        setUrls({
          aadhaarFront: data.aadhaarFront ?? null,
          aadhaarBack: data.aadhaarBack ?? null,
          dlFront: data.dlFront ?? null,
          dlBack: data.dlBack ?? null,
        });
      }
      setLoading(false);
    });
  }, [token]);

  const previews = useMemo(() => {
    const next = { ...urls } as Record<DocKey, string | null>;
    for (const key of Object.keys(files) as DocKey[]) {
      if (files[key]) next[key] = URL.createObjectURL(files[key]!);
    }
    return next;
  }, [files, urls]);

  useEffect(() => {
    return () => {
      for (const key of Object.keys(files) as DocKey[]) {
        if (files[key] && previews[key]?.startsWith('blob:')) {
          URL.revokeObjectURL(previews[key]!);
        }
      }
    };
  }, [files, previews]);

  async function handleFileChange(key: DocKey, file: File | null) {
    setFiles((prev) => ({ ...prev, [key]: file }));
    setError('');
    if (!file) return;

    setUploadingKey(key);
    try {
      const url = await uploadKycFile(token, file);
      setUrls((prev) => ({ ...prev, [key]: url }));
    } catch (err) {
      setFiles((prev) => ({ ...prev, [key]: null }));
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingKey(null);
    }
  }

  const allDocsReady = DOC_FIELDS.every((f) => urls[f.key]);
  const canSubmit = allDocsReady && dlNumber.trim().length >= 4 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError('');
    try {
      const result = await uploadKyc(token, {
        aadhaarNumber: aadhaarNumber.replace(/\D/g, '').slice(0, 12) || undefined,
        drivingLicenseNumber: dlNumber.trim(),
        licenseClass,
        aadhaarFront: urls.aadhaarFront!,
        aadhaarBack: urls.aadhaarBack!,
        dlFront: urls.dlFront!,
        dlBack: urls.dlBack!,
      });
      setExisting(result);
      onSubmitted?.(result);
      if (bookingId) {
        router.push(`/bookings/${bookingId}?paid=1&kyc=submitted`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Loading KYC status…</p>;
  }

  if (existing?.status === 'APPROVED') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden />
        <h2 className="mt-3 font-display text-lg font-bold text-emerald-900">KYC approved</h2>
        <p className="mt-1 text-sm text-emerald-800">You&apos;re verified and ready for pickup.</p>
        {bookingId ? (
          <Link
            href={`/bookings/${bookingId}`}
            className="mt-4 inline-block text-sm font-semibold text-emerald-700 underline"
          >
            Back to booking →
          </Link>
        ) : null}
      </div>
    );
  }

  const isPending = ['PENDING', 'UNDER_REVIEW'].includes(existing?.status ?? '');

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {existing?.status === 'REJECTED' ? (
        <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">Previous submission rejected</p>
            <p className="mt-0.5">{existing.rejectionReason ?? 'Please re-upload clear documents.'}</p>
          </div>
        </div>
      ) : null}

      {isPending && !existing?.rejectionReason ? (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <div>
            <p className="font-medium">Under review</p>
            <p className="mt-0.5">You can update documents below and resubmit if needed.</p>
          </div>
        </div>
      ) : null}

      <section className="rounded-3xl border border-surface-200 bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <IdCard className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="font-display font-bold text-surface-900">Aadhaar card</h2>
            <p className="text-sm text-slate-600">Upload front and back photos</p>
          </div>
        </div>

        <div className="mb-4">
          <Input
            label="Aadhaar number (optional)"
            placeholder="XXXX XXXX XXXX"
            inputMode="numeric"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {DOC_FIELDS.filter((f) => f.key.startsWith('aadhaar')).map((field) => (
            <DocumentUploadField
              key={field.key}
              label={field.label}
              hint={field.hint}
              file={files[field.key]}
              previewUrl={previews[field.key]}
              uploading={uploadingKey === field.key}
              onChange={(file) => void handleFileChange(field.key, file)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-surface-200 bg-white p-6 shadow-card">
        <div className="mb-5">
          <h2 className="font-display font-bold text-surface-900">Driving license</h2>
          <p className="text-sm text-slate-600">Valid DL required before vehicle handover</p>
        </div>

        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="DL number"
            placeholder="e.g. KA01 20240001234"
            value={dlNumber}
            onChange={(e) => setDlNumber(e.target.value.toUpperCase())}
            required
          />
          <Select
            id="license-class"
            label="License class"
            value={licenseClass}
            onChange={(e) => setLicenseClass(e.target.value)}
          >
            {LICENSE_CLASSES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {DOC_FIELDS.filter((f) => f.key.startsWith('dl')).map((field) => (
            <DocumentUploadField
              key={field.key}
              label={field.label}
              hint={field.hint}
              file={files[field.key]}
              previewUrl={previews[field.key]}
              uploading={uploadingKey === field.key}
              onChange={(file) => void handleFileChange(field.key, file)}
            />
          ))}
        </div>
      </section>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {bookingId ? (
          <Link
            href={`/bookings/${bookingId}`}
            className="text-center text-sm font-medium text-slate-600 hover:text-brand-600 sm:text-left"
          >
            Skip for now
          </Link>
        ) : (
          <span />
        )}
        <Button
          type="submit"
          size="lg"
          className={cn('w-full sm:w-auto', !canSubmit && 'opacity-70')}
          disabled={!canSubmit}
        >
          {submitting ? 'Submitting…' : 'Submit for verification'}
        </Button>
      </div>
    </form>
  );
}
