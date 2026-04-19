import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
  offset: number;
}

export default function StarfieldDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const visibleRef = useRef(true);
  const animIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate stars
    const stars: Star[] = [];
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * 1000,
        y: Math.random() * 500,
        z: Math.random() * 1000,
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;

    // Resize handling
    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    // Visibility
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(section);

    // Animation
    let time = 0;
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current || !ctx) return;

      time += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const scrollOffset = window.scrollY * 0.1;

      stars.forEach((star) => {
        const parallaxY = star.y + (scrollOffset / (star.z * 0.01 + 1)) * 0.3;
        const wrappedY = ((parallaxY % h) + h) % h;
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(time * star.speed + star.offset));
        const size = 1 + (1000 - star.z) / 1000;

        ctx.beginPath();
        ctx.arc(star.x * (w / 1000), wrappedY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.fill();
      });
    };
    animate();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const quote = sectionRef.current?.querySelector('.quote-text');
      if (quote) {
        gsap.fromTo(
          quote,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
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
      ref={sectionRef}
      className="relative overflow-hidden h-[500px]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-[1] flex items-center justify-center h-full px-6">
        <p
          className="quote-text font-display font-semibold italic text-white text-center max-w-[700px] opacity-0"
          style={{
            fontSize: 'clamp(24px, 3vw, 40px)',
            textShadow: '0 0 40px rgba(0, 217, 192, 0.3)',
          }}
        >
          The future of finance is decentralized — and it starts with you.
        </p>
      </div>
    </section>
  );
}
