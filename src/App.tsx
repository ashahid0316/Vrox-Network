import { useLenisInit } from '@/hooks/useLenis';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from '@/components/Navigation';
import KnowledgeHub from '@/pages/KnowledgeHub';
import ArticleDetail from '@/pages/ArticleDetail';
import Home from '@/pages/Home';

const HomePage = () => {
  useLenisInit();

  return <Home />;
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
