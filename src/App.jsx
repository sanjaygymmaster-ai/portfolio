import Chatbot from './components/Chatbot';
import BlogDetail from './components/BlogDetail';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ProjectDetail from './components/ProjectDetail';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import { usePageAnalytics } from './hooks/usePageAnalytics';
import { Route, Routes } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <BlogSection />
      <ProjectsSection />
    </>
  );
}

export default function App() {
  usePageAnalytics();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
