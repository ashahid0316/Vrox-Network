import SocialButton from '@/components/SocialButton';

export default function Footer() {
  return (
    <footer className="relative z-[2] bg-[#080614] border-t border-[rgba(255,255,255,0.06)] pt-[60px] pb-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-vrox.png"
              alt="VROX Network"
              className="h-10 w-auto"
            />
            <span className="font-mono text-[15px] font-medium tracking-[0.2em] text-white">
              VROX
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <SocialButton
              icon="/assets/icon-telegram.png"
              alt="Telegram"
            />
            <SocialButton
              icon="/assets/icon-twitter.png"
              alt="Twitter"
            />
            <a
              href="/knowledge-hub/"
              className="font-mono text-sm uppercase tracking-[0.15em] text-[#9B9B9B] hover:text-[#00D9C0] transition-colors"
            >
              Learn
            </a>
            <a
              href="/support/"
              className="font-mono text-sm uppercase tracking-[0.15em] text-[#9B9B9B] hover:text-[#00D9C0] transition-colors"
            >
              Support
            </a>
          </div>
        </div>

        <p className="text-center font-body text-sm mt-10" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
          &copy; 2026 Vrox Network Global. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
