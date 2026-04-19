import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function splitTextToChars(text: string): string[] {
  return text.split('');
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [scrollHidden, setScrollHidden] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero for 2000px
      if (pinRef.current) {
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: 'top top',
          end: '+=2000',
          pin: true,
          pinSpacing: true,
        });
      }

      // Page flip animation for title characters
      const allChars: HTMLElement[] = [];
      [titleLine1Ref.current, titleLine2Ref.current].forEach((line) => {
        if (line) {
          const chars = line.querySelectorAll('.hero-title-char');
          chars.forEach((c) => allChars.push(c as HTMLElement));
        }
      });

      if (allChars.length > 0) {
        gsap.fromTo(
          allChars,
          {
            transformOrigin: '50% 50% 10px',
            z: -10,
            rotationY: 90,
            rotationX: -70,
            y: '50%',
            opacity: 0,
          },
          {
            duration: 1,
            ease: 'expo.out',
            stagger: { amount: 0.4, from: 'start' },
            delay: 0.5,
            rotationY: 0,
            rotationX: 0,
            y: '0%',
            opacity: 1,
          }
        );
      }

      // Subtitle entrance
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 1.8 }
        );
      }

      // Tagline entrance
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 2.2 }
        );
      }

      // CTA entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out',
            delay: 2.6,
          }
        );
      }

      // Scroll indicator entrance
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 3 }
        );
      }
    }, sectionRef);

    // Scroll indicator fade out
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrollHidden(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const titleLine1 = 'VROX';
  const titleLine2 = 'NETWORK';

  return (
    <div ref={sectionRef}>
      <div
        ref={pinRef}
        className="relative z-[1] flex flex-col items-center justify-center min-h-[100dvh] px-6"
      >
        <div style={{ perspective: '1000px' }}>
          <div
            ref={titleLine1Ref}
            className="font-display font-bold text-white text-center leading-none tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(56px, 7vw, 120px)',
              textShadow: '0 0 40px rgba(11, 8, 23, 0.8), 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {splitTextToChars(titleLine1).map((char, i) => (
              <span key={i} className="hero-title-char">
                {char}
              </span>
            ))}
          </div>
          <div
            ref={titleLine2Ref}
            className="font-display font-bold text-white text-center leading-none tracking-[-0.03em] mt-2"
            style={{
              fontSize: 'clamp(56px, 7vw, 120px)',
              textShadow: '0 0 40px rgba(11, 8, 23, 0.8), 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {splitTextToChars(titleLine2).map((char, i) => (
              <span key={i} className="hero-title-char">
                {char}
              </span>
            ))}
          </div>
        </div>

        <p
          ref={subtitleRef}
          className="font-body text-[#00D9C0] uppercase text-center mt-5 opacity-0"
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            letterSpacing: '0.05em',
            fontWeight: 400,
            textShadow: '0 0 40px rgba(11, 8, 23, 0.8), 0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Empowering the Decentralized Future
        </p>

        <p
          ref={taglineRef}
          className="font-body text-[#9B9B9B] text-center mt-3 max-w-[500px] opacity-0"
          style={{
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            fontWeight: 400,
            textShadow: '0 0 40px rgba(11, 8, 23, 0.8), 0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Secure. Transparent. Community-Driven. Be an Early Adopter.
        </p>

        <button
          ref={ctaRef}
          id="hero-cta"
          onClick={() => {
            alert('Download coming soon!');
          }}
          className="font-mono text-[15px] uppercase tracking-[0.12em] font-medium mt-10 px-10 py-4 rounded-xl opacity-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #4ADE80, #00D9C0)',
            color: '#0B0817',
            boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
            textShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 50px rgba(74, 222, 128, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.3)';
          }}
        >
          Download & Start Mining
        </button>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${
            scrollHidden ? 'opacity-0' : ''
          }`}
        >
          <div className="w-px h-[60px] bg-[rgba(255,255,255,0.3)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.6)] animate-pulse-scroll -mt-0.5" />
        </div>
      </div>
    </div>
  );
}
