import { useLenisInit } from '@/hooks/useLenis';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from '@/components/Navigation';
import HeroCanvas from '@/components/HeroCanvas';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import StarfieldDivider from '@/sections/StarfieldDivider';
import StatsSection from '@/sections/StatsSection';
import FeaturesSection from '@/sections/FeaturesSection';
import RoadmapSection from '@/sections/RoadmapSection';
import Footer from '@/sections/Footer';
import KnowledgeHub from '@/pages/KnowledgeHub';
import ArticleDetail from '@/pages/ArticleDetail';

const HomePage = () => {
  useLenisInit();

  return (
    <>
      <HeroCanvas />
      <div id="top" />
      <HeroSection />
      <AboutSection />
      <StarfieldDivider />
      <StatsSection />
      <FeaturesSection />
      <RoadmapSection />
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<KnowledgeHub />} />
        <Route path="/learn/:slug" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
