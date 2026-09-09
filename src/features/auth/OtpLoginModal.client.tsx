'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { API_URL, sendOtp, verifyOtp } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';
import { cn } from '@/lib/utils';

interface OtpLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function formatPhoneDisplay(phone: string) {
  if (phone.length !== 10) return phone;
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

const showDevOtpHint =
  API_URL.includes('localhost') || API_URL.includes('127.0.0.1');

export function OtpLoginModal({ open, onClose, onSuccess }: OtpLoginModalProps) {
  const dispatch = useAppDispatch();
  const titleId = useId();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const busyRef = useRef(false);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep('phone');
      setPhone('');
      setOtp('');
      setError('');
      setLoading(false);
      setResendCooldown(0);
      return;
    }
    const timer = window.setTimeout(() => {
      if (step === 'phone') phoneInputRef.current?.focus();
      else otpInputRef.current?.focus();
    }, 50);
    return () => window.clearTimeout(timer);
  }, [open, step]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setInterval(() => {
      setResendCooldown((value) => (value <= 1 ? 0 : value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  if (!open) return null;

  const header =
    step === 'phone'
      ? {
          title: 'Enter phone number',
          subtitle: 'We will send a 6-digit OTP to verify your number on WhatsApp.',
        }
      : {
          title: 'Verify to continue',
          subtitle: `WhatsApp OTP sent to ${formatPhoneDisplay(phone)}`,
        };

  async function handleSendOtp() {
    if (busyRef.current) return;
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    busyRef.current = true;
    setLoading(true);
    setError('');
    try {
      await sendOtp(phone);
      setStep('otp');
      setOtp('');
      setResendCooldown(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      busyRef.current = false;
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (busyRef.current) return;
    if (otp.length < 4) {
      setError('Enter the OTP sent to your WhatsApp.');
      return;
    }
    busyRef.current = true;
    setLoading(true);
    setError('');
    try {
      const tokens = await verifyOtp(phone, otp);
      dispatch(setCredentials(tokens));
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
    } finally {
      busyRef.current = false;
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0 || loading) return;
    await handleSendOtp();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 'phone') void handleSendOtp();
    else void handleVerifyOtp();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#121826]/75 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#121826] px-6 pb-5 pt-6 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF6B35] shadow-lg shadow-[#FF6B35]/30">
            <MessageCircle className="h-5 w-5 text-white" aria-hidden />
          </div>

          <h2 id={titleId} className="mt-4 font-display text-xl font-bold tracking-tight">
            {header.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{header.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {step === 'phone' ? (
            <div>
              <label
                htmlFor="otp-modal-phone"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Mobile number
              </label>
              <div
                className={cn(
                  'flex overflow-hidden rounded-xl border bg-white shadow-sm transition',
                  error ? 'border-red-400' : 'border-slate-200 focus-within:border-[#FF6B35] focus-within:ring-4 focus-within:ring-[#FF6B35]/15',
                )}
              >
                <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3.5 text-sm font-semibold text-slate-600">
                  +91
                </span>
                <input
                  ref={phoneInputRef}
                  id="otp-modal-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="h-12 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                {showDevOtpHint
                  ? 'Dev: any 10-digit mobile · OTP 123456'
                  : 'Check WhatsApp for your 6-digit OTP.'}
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="otp-modal-code"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Enter OTP
              </label>
              <input
                ref={otpInputRef}
                id="otp-modal-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={cn(
                  'input-field text-center text-lg tracking-[0.35em]',
                  error && 'border-red-400',
                )}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                {showDevOtpHint ? 'Dev: any mobile number · OTP 123456' : 'Enter the code sent to your WhatsApp.'}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  className="font-medium text-slate-600 underline-offset-2 hover:text-[#FF6B35] hover:underline"
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                    setError('');
                  }}
                  disabled={loading}
                >
                  Change number
                </button>
                <button
                  type="button"
                  className="font-medium text-[#FF6B35] disabled:text-slate-400"
                  onClick={() => void handleResendOtp()}
                  disabled={loading || resendCooldown > 0}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}

          {error ? (
            <p className="rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>
          ) : null}

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="h-12 flex-1 rounded-xl border-slate-200"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            {step === 'phone' ? (
              <Button
                type="submit"
                className="h-12 flex-1 rounded-xl bg-[#FF6B35] hover:bg-[#E85A28] focus-visible:ring-[#FF6B35]"
                disabled={loading || phone.length < 10}
              >
                {loading ? 'Sending…' : 'Send OTP'}
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-12 flex-1 rounded-xl bg-[#FF6B35] hover:bg-[#E85A28] focus-visible:ring-[#FF6B35]"
                disabled={loading || otp.length < 4}
              >
                {loading ? 'Verifying…' : 'Verify & pay'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
