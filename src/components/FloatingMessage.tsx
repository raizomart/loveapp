import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

const FloatingMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Your custom message here - change this to whatever you want!
  const customMessage = `Hey beautiful! 💕
  
Hi love, Please forgive my work if there are grammar mistakes or if this application doesn’t look that good. It’s been a while since I last did this. I made it because we’re far from each other and can’t even celebrate our Monthsary together. Thank you for patiently understanding me all the time. I’m sorry if we won’t be seeing each other in person for a while, but I’ll work hard so we can be together every day again. I hope you’re doing good. Always give your best, like you always do. I am missing you so much—our hangouts, your scent, your presence, and everything about you. Just know that I will always love you!




Now, things feel different, and I can’t help but feel sad. I keep overthinking about everything, especially now that I’ve been staying at home for months because we’re still prioritizing my requirements. Papa hasn’t been able to get me in with them in the job yet, since I’m still missing some documents and time. But I will do my best to join the Navy. I plan to take the real exam by next Monday or by the end of next week. If things don’t go well, I’ll take the Navy test again. My requirements are almost done anyway, so I’ll soon be able to find a job. 
  
Forever yours,
Your handsome boyfie 😘✨`;

  useEffect(() => {
    // Show the message after 3 seconds when the page loads
    const timer = setTimeout(() => {
      if (!hasBeenShown) {
        setIsVisible(true);
        setHasBeenShown(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasBeenShown]);

  const closeMessage = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn overflow-y-auto"
      onClick={closeMessage}
    >
      <div 
        className="relative max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-4 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating note with paper-like styling */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg sm:rounded-xl shadow-2xl border-2 border-pink-200 p-3 sm:p-4 md:p-5 relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl"></div>
          
          {/* Close button */}
          <button
            onClick={closeMessage}
            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white rounded-full p-1.5 sm:p-2 hover:bg-gray-100 transition-colors shadow-lg z-20 flex items-center justify-center border border-gray-200"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-gray-800" />
          </button>

          {/* Heart decoration */}
          <div className="flex justify-center mb-2 sm:mb-3">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 fill-current animate-pulse" />
          </div>

          {/* Message content */}
          <div className="relative z-10">
            <pre className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-wrap text-center max-h-[60vh] overflow-y-auto">
              {customMessage}
            </pre>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 text-pink-300 text-sm sm:text-base opacity-50">💕</div>
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-rose-300 text-xs sm:text-sm opacity-50">✨</div>
          <div className="absolute top-1/2 left-0 sm:left-1 text-purple-300 text-[10px] sm:text-xs opacity-30">💖</div>
          <div className="absolute top-1/3 right-0 sm:right-1 text-pink-400 text-[10px] sm:text-xs opacity-30">🌟</div>
        </div>

        {/* Paper shadow effect */}
        <div className="absolute inset-0 bg-gray-400/20 rounded-lg sm:rounded-xl transform translate-x-1 translate-y-1 -z-10"></div>
      </div>
    </div>
  );
};

export default FloatingMessage;