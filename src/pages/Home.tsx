import Footer from '@/sections/Footer';
import HeroSection from '@/sections/HeroSection';
import RoadmapSection from '@/sections/RoadmapSection';
import StatsSection from '@/sections/StatsSection';
import StarfieldDivider from '@/sections/StarfieldDivider';
import FeaturesSection from '@/sections/FeaturesSection';
import AboutSection from '@/sections/AboutSection';

export default function Home() {
  return (
    <div className="bg-[#080614] text-white">
      <HeroSection />
      <StatsSection />
      <StarfieldDivider />
      <AboutSection />
      <FeaturesSection />
      <RoadmapSection />
      <Footer />
    </div>
  );
}
