import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getLenis } from '@/hooks/useLenis';

type NavLink = { label: string; target?: string; href?: string };

const NAV_LINKS: NavLink[] = [
  { label: 'Home', target: '#top' },
  { label: 'Mine', target: '#about' },
  { label: 'Whitepaper', target: '#features' },
  { label: 'Roadmap', target: '#roadmap' },
  { label: 'Learn', href: '/knowledge-hub/' },
  { label: 'Support', href: '/support/' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['top', 'about', 'features', 'roadmap'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (target: string) => {
    const lenis = getLenis();
    if (target === '#top') {
      lenis?.scrollTo(0);
    } else {
      lenis?.scrollTo(target);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] px-6 md:px-10 flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(11,8,23,0.9)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#top')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="./assets/logo-vrox.png"
            alt="VROX Network"
            className="h-10 w-auto"
          />
          <span className="font-mono text-[15px] font-medium tracking-[0.2em] text-white">
            VROX
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = link.href ? location.pathname.startsWith(link.href) : activeSection === link.target?.slice(1);
            if (link.href) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-mono text-[13px] uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer relative pb-1 ${
                    isActive ? 'text-[#00D9C0]' : 'text-[#9B9B9B] hover:text-[#00D9C0]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00D9C0]" />
                  )}
                </a>
              );
            }
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className={`font-mono text-[13px] uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer relative pb-1 ${
                  isActive ? 'text-[#00D9C0]' : 'text-[#9B9B9B] hover:text-[#00D9C0]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00D9C0]" />
                )}
              </button>
            );
          })}
          <button
            onClick={() => scrollTo('#hero-cta')}
            className="font-mono text-[13px] uppercase tracking-[0.12em] font-semibold px-6 py-2.5 rounded-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #4ADE80, #00D9C0)',
              color: '#0B0817',
            }}
          >
            Download App
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer z-[1001]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-0' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-[rgba(11,8,23,0.98)] backdrop-blur-[20px] flex flex-col items-center justify-center gap-8 transition-all duration-400 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => {
          if (link.href) {
            return (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-2xl font-semibold text-white cursor-pointer"
              >
                {link.label}
              </a>
            );
          }
          return (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="font-display text-2xl font-semibold text-white cursor-pointer"
            >
              {link.label}
            </button>
          );
        })}
        <button
          onClick={() => scrollTo('#hero-cta')}
          className="font-mono text-sm uppercase tracking-[0.12em] font-semibold px-8 py-3 rounded-lg cursor-pointer mt-4"
          style={{
            background: 'linear-gradient(135deg, #4ADE80, #00D9C0)',
            color: '#0B0817',
          }}
        >
          Download App
        </button>
      </div>
    </>
  );
}
