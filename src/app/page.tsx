const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Zustand",
  "React Hook Form",
  "Zod",
  "Supabase",
  "Vercel",
] as const;

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[var(--ocean-deep)] text-[var(--ivory)]">
      <div aria-hidden="true" className="ocean-glow absolute inset-0 -z-10" />
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-white/15 pb-5 text-xs tracking-[0.24em] uppercase">
          <span>Le Sommet Bleu</span>
          <span className="text-white/55">Project Foundation</span>
        </header>

        <div className="max-w-4xl py-20">
          <p className="mb-6 text-xs tracking-[0.36em] text-[var(--sea-glass)] uppercase">
            Immersive Ocean View
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-6xl leading-[0.9] font-light tracking-[-0.04em] sm:text-8xl lg:text-9xl">
            가장 높은 곳에서,
            <br />
            바다와 마주하다.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            몰입형 오션뷰 경험을 위한 Le Sommet Bleu의 디지털 기반을 시작합니다.
          </p>
        </div>

        <footer className="grid gap-6 border-t border-white/15 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <ul className="flex max-w-3xl flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <p className="text-xs tracking-[0.18em] text-[var(--sea-glass)] uppercase">
            Foundation Ready
          </p>
        </footer>
      </section>
    </main>
  );
}
