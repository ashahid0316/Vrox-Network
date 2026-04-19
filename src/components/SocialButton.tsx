interface SocialButtonProps {
  icon: string;
  alt: string;
  href?: string;
}

export default function SocialButton({ icon, alt, href = '#' }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all duration-300 hover:border-[rgba(0,217,192,0.4)] group"
    >
      <img
        src={icon}
        alt={alt}
        className="w-6 h-6 transition-colors duration-300 opacity-60 group-hover:opacity-100"
        style={{ filter: 'none' }}
      />
    </a>
  );
}
