'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sendOtp, verifyOtp } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';

interface LoginFormProps {
  redirectTo: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSendOtp() {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendOtp(phone);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (otp.length < 4) {
      setError('Enter the OTP sent to your WhatsApp.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const tokens = await verifyOtp(phone, otp);
      dispatch(setCredentials(tokens));
      router.replace(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-xl shadow-surface-900/5">
      <div className="bg-surface-900 px-6 py-8 text-white sm:px-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500">
          <MessageCircle className="h-5 w-5" aria-hidden />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold">Login to OnnRide</h1>
        <p className="mt-2 text-sm text-slate-400">
          WhatsApp OTP — no password. Use your mobile number to access bookings and profile.
        </p>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        {step === 'phone' ? (
          <Input
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          />
        ) : (
          <Input
            label="Enter OTP"
            type="text"
            inputMode="numeric"
            placeholder="6-digit OTP"
            hint="Dev: any 10-digit number · OTP 123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          />
        )}

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}

        <div className="flex gap-3 pt-2">
          {step === 'otp' ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setStep('phone');
                setOtp('');
                setError('');
              }}
              disabled={loading}
            >
              Change number
            </Button>
          ) : (
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full" disabled={loading}>
                Browse as guest
              </Button>
            </Link>
          )}

          {step === 'phone' ? (
            <Button className="flex-1" onClick={handleSendOtp} disabled={loading}>
              {loading ? 'Sending…' : 'Send OTP'}
            </Button>
          ) : (
            <Button className="flex-1" onClick={handleVerifyOtp} disabled={loading}>
              {loading ? 'Verifying…' : 'Verify & continue'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface LoginPageProps {
  redirectTo: string;
}

export function LoginPage({ redirectTo }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-surface-50">
      <div className="section-container flex min-h-screen flex-col justify-center py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        <div className="mx-auto w-full max-w-md">
          <LoginForm redirectTo={redirectTo} />
          <p className="mt-6 text-center text-xs text-slate-500">
            After login you&apos;ll return to{' '}
            <span className="font-medium text-surface-700">{redirectTo}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
