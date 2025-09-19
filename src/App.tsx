import React from 'react';
import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import BackgroundMusic from './components/BackgroundMusic';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MemoryTimeline from './components/MemoryTimeline';
import PhotoGallery from './components/PhotoGallery';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import JourneyGame from './components/JourneyGame';
import Footer from './components/Footer';
import FloatingHearts from './components/FloatingHearts';
import FloatingMessage from './components/FloatingMessage';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);

  if (!showMainApp) {
    return <LoadingScreen onComplete={() => setShowMainApp(true)} />;
  }

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <FloatingMessage />
      <BackgroundMusic />
      <Navigation />
      
      <div id="home">
        <Hero />
      </div>
      
      <div id="journey">
        <JourneyGame />
      </div>
      
      <div id="timeline">
        <MemoryTimeline />
      </div>
      
      <div id="gallery">
        <PhotoGallery />
      </div>
      
      <div id="reasons">
        <ReasonsILoveYou />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;