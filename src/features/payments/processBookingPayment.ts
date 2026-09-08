import {
  completeMockPayment,
  createPaymentOrder,
  getBooking,
  verifyPayment,
} from '@/lib/api';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function processBookingPayment(
  token: string,
  bookingId: string,
  customerPhone?: string,
  paymentMode: 'FULL' | 'PARTIAL' = 'FULL',
): Promise<{ bookingStatus?: string; pendingBalance?: string }> {
  const order = await createPaymentOrder(token, bookingId, paymentMode);

  if (order.keyId === 'mock_key') {
    const result = await completeMockPayment(token, bookingId);
    return {
      bookingStatus: (result as { bookingStatus?: string }).bookingStatus,
      pendingBalance: (result as { pendingBalance?: string }).pendingBalance,
    };
  }

  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error('Failed to load Razorpay checkout');
  }

  const verifyResult = await new Promise<{
    bookingStatus?: string;
    pendingBalance?: string;
  }>((resolve, reject) => {
    let settled = false;
    let paymentInFlight = false;

    const finish = (result: { bookingStatus?: string; pendingBalance?: string }) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      reject(err);
    };

    async function verifyWithFallback(response: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) {
      try {
        const result = await verifyPayment(token, bookingId, {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
        finish({
          bookingStatus: (result as { bookingStatus?: string }).bookingStatus,
          pendingBalance: (result as { pendingBalance?: string }).pendingBalance,
        });
      } catch (err) {
        // Payment may already be confirmed via webhook — check booking before failing
        const booking = await getBooking(token, bookingId);
        if (
          booking &&
          ['CONFIRMED', 'PARTIAL_PAID'].includes(booking.bookingStatus)
        ) {
          finish({
            bookingStatus: booking.bookingStatus,
            pendingBalance: booking.pendingBalance ?? undefined,
          });
          return;
        }
        fail(err instanceof Error ? err : new Error('Payment verification failed'));
      }
    }

    const options: Record<string, unknown> = {
      key: order.keyId,
      amount: Math.round(order.amount * 100),
      currency: order.currency,
      name: 'OnnRide',
      description:
        order.paymentMode === 'PARTIAL'
          ? 'Partial booking payment'
          : order.paymentMode === 'BALANCE'
            ? 'Remaining booking balance'
            : 'Self-drive bike rental',
      order_id: order.orderId,
      prefill: customerPhone ? { contact: customerPhone } : {},
      theme: { color: '#ea580c' },
      handler: (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        paymentInFlight = true;
        void verifyWithFallback(response).finally(() => {
          paymentInFlight = false;
        });
      },
      modal: {
        ondismiss: () => {
          // Razorpay closes the modal after success — ignore dismiss during/after verify
          if (settled || paymentInFlight) return;
          fail(new Error('Payment cancelled'));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      if (settled || paymentInFlight) return;
      fail(new Error(response.error?.description ?? 'Payment failed'));
    });
    rzp.open();
  });

  return verifyResult;
}
