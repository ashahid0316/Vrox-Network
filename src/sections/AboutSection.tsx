import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: './assets/icon-pickaxe.png',
    label: 'Active Mining',
    sublabel: 'Start earning VROX tokens today',
  },
  {
    icon: './assets/icon-shield.png',
    label: 'Security First',
    sublabel: 'Decentralized & encrypted',
  },
  {
    icon: './assets/icon-users.png',
    label: 'Community Growth',
    sublabel: 'Join thousands of miners worldwide',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.animate-in');
      elements?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: i === 0 ? 20 : i === 1 ? 40 : 30 },
          {
            opacity: 1,
            y: 0,
            duration: i === 1 ? 1 : 0.8,
            ease: i === 1 ? 'expo.out' : 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-[2] bg-[#0B0817] pt-[160px] pb-[120px] px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel text="// ABOUT VROX" />

        <h2
          className="animate-in font-display font-semibold text-white opacity-0"
          style={{
            fontSize: 'clamp(36px, 4vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Join the Movement: Phase 1 is Live!
        </h2>

        <p
          className="animate-in font-body text-[#9B9B9B] mt-6 max-w-[700px] opacity-0"
          style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 400 }}
        >
          VROX Network is more than just an app; it is an ecosystem built on the
          principles of decentralization and security. Our current mission is to
          establish a massive, active community through our native mining platform.
          Every miner strengthens the network. Every participant shapes the future.
        </p>

        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[60px] mt-[60px]"
        >
          {FEATURES.map((feat) => (
            <div
              key={feat.label}
              className="feature-card flex flex-col items-center text-center"
            >
              <img
                src={feat.icon}
                alt={feat.label}
                className="w-12 h-12"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(0, 217, 192, 0.4))',
                }}
              />
              <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-white mt-4">
                {feat.label}
              </span>
              <span className="font-body text-sm text-[#9B9B9B] mt-2">
                {feat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
