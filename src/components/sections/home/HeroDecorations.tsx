/** CSS-only hero orbs — no Framer Motion on critical path */
export function HeroDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden lg:right-1/2 [contain:layout]"
      aria-hidden
    >
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-orb hero-orb-c" />
    </div>
  );
}
 