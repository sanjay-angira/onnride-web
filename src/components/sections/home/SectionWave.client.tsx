export function SectionWave({ flip }: { flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none relative -mt-px w-full text-muted ${flip ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-8 w-full sm:h-10"
        preserveAspectRatio="none"
      >
        <path
          d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
