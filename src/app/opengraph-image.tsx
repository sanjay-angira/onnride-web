import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'OnnRide — Self-Drive Bike & Scooter Rental in India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
          background: 'linear-gradient(135deg, #0f172a 0%, #ea580c 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 16 }}>OnnRide</div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, maxWidth: 900 }}>
          Self-Drive Bike &amp; Scooter Rental in India
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.9 }}>
          Verified vendors · Helmet included · Book online
        </div>
      </div>
    ),
    { ...size },
  );
}
