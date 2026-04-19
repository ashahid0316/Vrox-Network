interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#00D9C0] mb-4">
      {text}
    </p>
  );
}
