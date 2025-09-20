import React from 'react';
import { Heart, Music } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100">
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <div className="mb-8 inline-block">
          <Heart className="w-16 h-16 text-rose-500 fill-current animate-pulse mx-auto mb-4" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6 leading-tight">
          My Love Letter
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light leading-relaxed">
          A digital collection of our beautiful memories and endless reasons why you mean the world to me
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Our Journey ✨
          </button>
          
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Music className="w-4 h-4" />
            <span className="text-sm">Now playing: "Perfect" by Ed Sheeran 🎵</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-pink-300 text-6xl animate-bounce">💕</div>
      <div className="absolute top-40 right-16 text-purple-300 text-4xl animate-pulse">✨</div>
      <div className="absolute bottom-32 left-20 text-rose-300 text-5xl animate-bounce" style={{animationDelay: '5s'}}>💖</div>
      <div className="absolute bottom-20 right-10 text-pink-400 text-3xl animate-pulse" style={{animationDelay: '2s'}}>🌟</div>
    </section>
  );
};

export default Hero;