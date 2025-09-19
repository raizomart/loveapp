import React from 'react';
import { Heart, Music, Star } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="mb-8">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto fill-current animate-pulse" />
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Forever and Always
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl mb-6 opacity-90 leading-relaxed max-w-2xl mx-auto px-4">
          Thank you for being the most incredible part of my story. Every day with you is a gift, 
          and I can't wait to create a million more memories together. You are my everything. 💕
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span className="text-sm sm:text-base">Made with endless love</span>
          </div>
          <div className="flex items-center space-x-2">
            <Music className="w-5 h-5" />
            <span className="text-sm sm:text-base">Best viewed with our playlist</span>
          </div>
        </div>
        
        <div className="text-xs sm:text-sm opacity-75 px-4">
          Created with 💖 for the most amazing person in the world
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </footer>
  );
};

export default Footer;