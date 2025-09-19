import React, { useState } from 'react';
import { Heart, Sparkles, Star, Sun } from 'lucide-react';

const ReasonsILoveYou: React.FC = () => {
  const [revealedReasons, setRevealedReasons] = useState<Set<number>>(new Set());

  const reasons = [
    { text: "Your laugh lights up every room you enter", icon: <Sun className="w-5 h-5" /> },
    { text: "The way you care for everyone around you", icon: <Heart className="w-5 h-5" /> },
    { text: "How you make ordinary moments feel magical", icon: <Sparkles className="w-5 h-5" /> },
    { text: "Your incredible strength and determination", icon: <Star className="w-5 h-5" /> },
    { text: "Your determination inspires me to be better", icon: <Heart className="w-5 h-5" /> },
    { text: "Your voice is the sweetest sound I could ever hear.", icon: <Sun className="w-5 h-5" /> },
    { text: "Your ability to find beauty in everything", icon: <Sparkles className="w-5 h-5" /> },
    { text: "Your laugh feels like home", icon: <Heart className="w-5 h-5" /> },
    { text: "How you make me want to be a better person", icon: <Star className="w-5 h-5" /> },
    { text: "Your spontaneous adventures and surprises", icon: <Sparkles className="w-5 h-5" /> },
    { text: "The comfort of your warm hugs", icon: <Heart className="w-5 h-5" /> },
    { text: "Hottest girl in the world", icon: <Sun className="w-5 h-5" /> },
    { text: "Your creativity turns ordinary things into magic", icon: <Star className="w-5 h-5" /> },
    { text: "The way you support all my dreams", icon: <Sparkles className="w-5 h-5" /> },
    { text: "How you make every day an adventure", icon: <Heart className="w-5 h-5" /> },
    { text: "Your presence makes everything feel right", icon: <Sun className="w-5 h-5" /> }
  ];

  const handleRevealReason = (index: number) => {
    setRevealedReasons(prev => new Set(prev).add(index));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Reasons I Love You
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 px-4">
            Click on each heart to reveal why you're so special to me
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {revealedReasons.size} of {reasons.length} reasons discovered ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 min-h-[180px] sm:min-h-[200px] ${
                revealedReasons.has(index) ? 'revealed' : ''
              }`}
              onClick={() => handleRevealReason(index)}
            >
              {!revealedReasons.has(index) ? (
                <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex items-center justify-center group-hover:from-pink-500 group-hover:to-rose-600">
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-current animate-pulse" />
                </div>
              ) : (
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col items-center justify-center border-2 border-pink-200 group-hover:border-pink-300 animate-fadeIn">
                  <div className="text-pink-500 mb-3 animate-bounce">
                    {reason.icon}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed font-medium">
                    {reason.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {revealedReasons.size === reasons.length && (
          <div className="text-center mt-8 sm:mt-12 animate-fadeIn px-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 inline-block shadow-lg">
              <p className="text-sm sm:text-lg font-semibold">
                🎉 You've discovered all the reasons! (But there are countless more...) 💕
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating sparkles */}
      <div className="absolute top-20 left-10 text-4xl text-pink-300 animate-pulse">✨</div>
      <div className="absolute top-40 right-20 text-3xl text-purple-300 animate-bounce">💫</div>
      <div className="absolute bottom-32 left-16 text-2xl text-rose-300 animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
      <div className="absolute bottom-20 right-10 text-4xl text-pink-400 animate-bounce" style={{animationDelay: '2s'}}>✨</div>
    </section>
  );
};

export default ReasonsILoveYou;