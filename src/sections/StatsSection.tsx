import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: '50K+', label: 'Active Miners' },
  { number: '100M', label: 'VROX Tokens Mined' },
  { number: '99.9%', label: 'Network Uptime' },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statItems = sectionRef.current?.querySelectorAll('.stat-item');
      if (!statItems) return;

      statItems.forEach((item, index) => {
        const lineA = item.querySelector('.stat-line-a') as HTMLElement;
        const lineB = item.querySelector('.stat-line-b') as HTMLElement;
        const finalText = STATS[index].number;

        if (!lineA || !lineB) return;

        // Initially hide line B
        gsap.set(lineB, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.2,
        });

        // Animate diagonal wipe across Line A
        tl.fromTo(
          lineA,
          { '--wipe-pos': '100%' },
          { '--wipe-pos': '-200%', duration: 1.5, ease: 'power2.inOut' },
          0
        );

        // Scramble Line B text
        const obj = { progress: 0 };
        tl.to(
          obj,
          {
            progress: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
              const revealed = Math.floor(obj.progress * finalText.length);
              let display = '';
              for (let i = 0; i < finalText.length; i++) {
                if (i < revealed) {
                  display += finalText[i];
                } else {
                  display += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
              }
              lineB.textContent = display;
            },
          },
          0
        );

        // Fade in Line B
        tl.to(lineB, { opacity: 1, duration: 0.3 }, 1.2);

        // Fade out Line A
        tl.to(lineA, { opacity: 0, duration: 0.3 }, 1.2);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] py-20 px-6"
      style={{
        background:
          'linear-gradient(180deg, #0B0817 0%, #130D2A 50%, #0B0817 100%)',
      }}
    >
      <div className="max-w-[900px] mx-auto">
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#00D9C0] text-center mb-10">
          // NETWORK STATS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item flex flex-col items-center py-8 ${
                i > 0 ? 'md:border-l border-t md:border-t-0' : ''
              } border-[rgba(255,255,255,0.06)]`}
            >
              <div className="relative" style={{ height: 'clamp(48px, 6vw, 80px)', lineHeight: 'clamp(48px, 6vw, 80px)' }}>
                {/* Line A - White */}
                <div
                  className="stat-line-a font-display font-bold text-white tracking-[-0.03em]"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {stat.number}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent 0%, #4ADE80 50%, transparent 100%)',
                      transform: 'translateX(var(--wipe-pos, 100%))',
                      opacity: 0.8,
                    }}
                  />
                </div>
                {/* Line B - Green scramble */}
                <div
                  className="stat-line-b font-display font-bold tracking-[-0.03em]"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    position: 'absolute',
                    inset: 0,
                    color: '#4ADE80',
                    opacity: 0,
                  }}
                >
                  {stat.number}
                </div>
              </div>
              <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-[#9B9B9B] mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
