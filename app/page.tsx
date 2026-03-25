// app/page.tsx
import Navbar from './components/Navbar';
import HomeSection from './components/home/HomeSection';
import AboutPage from './pages/AboutPage';
import ProjectsSection from './components/home/ProjectsSection';


export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Home Section */}
      <HomeSection />

      {/* About Section */}
      <AboutPage />

      {/* Projects Section */}
      <ProjectsSection />

      
    </div>
  );
}
