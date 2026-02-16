import React from 'react';
import ParallaxGallery from './components/ParallaxGallery';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RadialOrbitalTimelineDemo from './components/RadialOrbitalTimelineDemo';
import AboutMe from './components/AboutMe';
import ProceduralGroundBackground from './components/ui/procedural-ground-background';
import { SecureMessageGateway } from './components/ui/secure-message-gateway';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black relative">
      {/* Global Background */}
      <ProceduralGroundBackground />

      <Navbar />
      
      <main className="relative z-10">
        {/* Vertical Stacked Gallery Section - Now includes the Hero internally */}
        <div id="work" className="relative z-10">
          <ParallaxGallery />
        </div>

        {/* About Me Section with Link Previews */}
        <div id="about">
          <AboutMe />
        </div>

        {/* Pricing/Packages Section */}
        <section id="price" className="h-[100vh] flex items-center justify-center relative bg-transparent z-20 overflow-hidden">
           <RadialOrbitalTimelineDemo />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-24 relative z-20 flex justify-center items-center bg-black/20 backdrop-blur-sm border-t border-white/5">
           <SecureMessageGateway />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;