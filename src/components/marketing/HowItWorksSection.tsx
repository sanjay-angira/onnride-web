import { CalendarCheck, CreditCard, FileCheck, MapPin } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    step: '01',
    title: 'Pick city & dates',
    body: 'Choose from active locations and your rental window — no login needed to browse.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Select your bike',
    body: 'Compare scooters, commuters, cruisers and more from verified local vendors.',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Book & pay online',
    body: 'WhatsApp OTP at checkout, then secure payment via Razorpay. Coupons & wallet supported.',
  },
  {
    icon: FileCheck,
    step: '04',
    title: 'KYC & ride',
    body: 'Upload DL & Aadhaar after booking. Pickup starts once KYC is approved.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="home-section bg-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      <div
        className="absolute inset-0 bg-section-dots bg-dots opacity-40"
        aria-hidden
      />
      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="home-section-label">Simple process</p>
          <h2 className="home-section-title mt-3">How self-drive rental works</h2>
          <p className="home-section-subtitle mx-auto">
            From search to saddle — four steps to your next ride on OnnRide.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-[12%] right-[12%] top-14 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block"
            aria-hidden
          />
          {steps.map((item) => (
            <li key={item.step} className="group relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/40 ring-4 ring-white transition group-hover:scale-105">
                <item.icon className="h-7 w-7" aria-hidden />
              </div>
              <span className="mt-4 block font-display text-sm font-bold uppercase tracking-widest text-brand-500">
                Step {item.step}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-surface-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
