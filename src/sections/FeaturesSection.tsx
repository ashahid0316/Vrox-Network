import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: './assets/icon-rocket.png',
    title: 'Official Launch',
    description:
      'VROX Network is officially live. Our platform is operational, secure, and ready for the community to start mining and building the decentralized future together.',
  },
  {
    icon: './assets/icon-zap.png',
    title: 'Active Mining',
    description:
      'Our native mining engine is running at full capacity. Mine VROX tokens directly from your device with zero fees and transparent reward distribution.',
  },
  {
    icon: './assets/icon-globe.png',
    title: 'Global Network',
    description:
      'Connect with miners across 100+ countries. The VROX network grows stronger with every new participant, creating a truly global decentralized ecosystem.',
  },
  {
    icon: './assets/icon-lock.png',
    title: 'Military-Grade Security',
    description:
      'End-to-end encryption, multi-signature wallets, and decentralized consensus mechanisms ensure your assets and data remain secure at all times.',
  },
];

function RGBShiftTitle({ text }: { text: string }) {
  return (
    <h3 className="card-title-container">
      <span className="card-title-red font-display font-semibold text-2xl" aria-hidden="true">
        {text}
      </span>
      <span className="card-title-blue font-display font-semibold text-2xl" aria-hidden="true">
        {text}
      </span>
      <span className="card-title-white font-display font-semibold text-2xl">
        {text}
      </span>
    </h3>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for section header
      const headerEls = sectionRef.current?.querySelectorAll('.header-animate');
      headerEls?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: i === 1 ? 40 : 20 },
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

      // Card entrances + RGB shift
      const cards = sectionRef.current?.querySelectorAll('.feature-card');
      cards?.forEach((card) => {
        // Card entrance
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // RGB shift on title
        const layers = card.querySelectorAll(
          '.card-title-red, .card-title-blue, .card-title-white'
        );

        gsap.set(layers, { opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            // Staggered glitch entry with random offsets
            layers.forEach((layer, idx) => {
              gsap.fromTo(
                layer,
                { opacity: 0, x: gsap.utils.random(-5, 5) },
                {
                  opacity: 1,
                  duration: 0.06,
                  delay: idx * 0.06,
                  ease: 'none',
                }
              );
            });

            // Converge after 1.5s
            gsap.to(layers, {
              x: 0,
              duration: 0.3,
              delay: 1.5,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative z-[2] bg-[#0B0817] py-[120px] px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="header-animate opacity-0">
          <SectionLabel text="// FEATURES" />
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
          The Next Generation of Decentralized Networking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="feature-card p-8 md:p-10 rounded-2xl transition-all duration-400"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 217, 192, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={card.icon}
                alt={card.title}
                className="w-8 h-8 mb-4"
              />
              <RGBShiftTitle text={card.title} />
              <p
                className="font-body text-[#9B9B9B] mt-4"
                style={{ fontSize: '16px', lineHeight: 1.6 }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
