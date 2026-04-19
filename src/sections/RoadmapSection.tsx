import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const ROADMAP_ITEMS = [
  {
    badge: 'Q2 2024',
    title: 'Integrated VROX Network Wallet',
    description: 'A secure, multi-asset wallet built directly into the VROX ecosystem.',
    side: 'left' as const,
  },
  {
    badge: 'Q3 2024',
    title: 'Official Whitepaper',
    description: 'Comprehensive technical documentation and economic model published.',
    side: 'right' as const,
  },
  {
    badge: 'Q4 2024',
    title: 'Project Roadmap',
    description: 'Full ecosystem expansion with DEX integration and staking protocols.',
    side: 'left' as const,
  },
];

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      const headers = sectionRef.current?.querySelectorAll('.header-animate');
      headers?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Roadmap items entrance
      const items = sectionRef.current?.querySelectorAll('.roadmap-item');
      items?.forEach((item, i) => {
        const isLeft = ROADMAP_ITEMS[i].side === 'left';
        const dot = item.querySelector('.roadmap-dot');

        gsap.fromTo(
          item,
          { opacity: 0, x: isLeft ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay: 0.3 + i * 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: 'back.out(2)',
              delay: 0.3 + i * 0.3,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative z-[2] bg-[#0B0817] py-[120px] px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="header-animate opacity-0">
          <SectionLabel text="// ROADMAP" />
        </div>
        <h2
          className="header-animate font-display font-semibold text-white opacity-0"
          style={{
            fontSize: 'clamp(36px, 4vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '60px',
          }}
        >
          The Journey Ahead
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(0,217,192,0.3)]"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Items */}
          <div className="space-y-12 md:space-y-16">
            {ROADMAP_ITEMS.map((item) => (
              <div
                key={item.badge}
                className={`roadmap-item relative flex items-start ${
                  item.side === 'left'
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-40px)] ${
                    item.side === 'left' ? 'md:pr-10 md:text-right' : 'md:pl-10'
                  }`}
                >
                  <span
                    className="inline-block font-mono text-xs uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                    style={{
                      background: '#00D9C0',
                      color: '#0B0817',
                    }}
                  >
                    {item.badge}
                  </span>
                  <h3 className="font-display font-semibold text-white text-[22px] mt-3">
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-[#9B9B9B] mt-2 max-w-[360px]"
                    style={{ fontSize: '16px' }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Dot */}
                <div
                  className="roadmap-dot absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00D9C0]"
                  style={{
                    boxShadow: '0 0 12px rgba(0, 217, 192, 0.5)',
                    marginTop: '6px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
