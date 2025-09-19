import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionPosition, setQuestionPosition] = useState({ top: '40%', left: '50%' });
  const [attemptCount, setAttemptCount] = useState(0);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading animation first
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowQuestion(true);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const getRandomPosition = () => {
    const positions = [
      { top: '25%', left: '50%' },
      { top: '35%', left: '30%' },
      { top: '35%', left: '70%' },
      { top: '55%', left: '25%' },
      { top: '55%', left: '75%' },
      { top: '45%', left: '50%' },
      { top: '30%', left: '60%' },
      { top: '60%', left: '40%' },
      { top: '40%', left: '35%' },
      { top: '50%', left: '65%' }
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  const handleNo = () => {
    setAttemptCount(prev => prev + 1);
    setQuestionPosition(getRandomPosition());
    
    // Add a little shake animation to the question
    const questionElement = document.querySelector('.question-card');
    if (questionElement) {
      questionElement.classList.add('animate-shake');
      setTimeout(() => {
        questionElement.classList.remove('animate-shake');
      }, 500);
    }
  };

  const handleYes = () => {
    setShowQuestion(false);
    setShowLoveMessage(true);
    
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  const getQuestionText = () => {
    const questions = [
      "Do you agree that I am the most handsome boyfie in the world?",
      "Come on... Do you agree that I am the most handsome boyfie in the world?",
      "Pretty please? Do you agree that I am the most handsome boyfie in the world?",
      "You know it's true... Do you agree that I am the most handsome boyfie in the world?",
      "Just say yes already! Do you agree that I am the most handsome boyfie in the world?",
      "I'm not giving up! Do you agree that I am the most handsome boyfie in the world?",
      "One more time... Do you agree that I am the most handsome boyfie in the world?",
      "You can't escape this! Do you agree that I am the most handsome boyfie in the world?"
    ];
    
    return questions[Math.min(attemptCount, questions.length - 1)];
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-rose-500 flex items-center justify-center z-50">
        <div className="text-center px-4 max-w-sm sm:max-w-md mx-auto">
          <div className="mb-8">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-current animate-pulse mx-auto mb-4" />
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Loading Something Special...
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Preparing your love letter ✨
          </p>
        </div>
      </div>
    );
  }

  if (showLoveMessage) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-rose-500 flex items-center justify-center z-50">
        <div className="text-center animate-fadeIn px-4 max-w-sm sm:max-w-md mx-auto">
          <div className="mb-8">
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white fill-current animate-pulse mx-auto mb-4 sm:mb-6" />
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-300 animate-spin mx-auto" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 animate-bounce leading-tight">
            Love you! 💕
          </h1>
          <p className="text-white/90 text-lg sm:text-xl animate-pulse">
            I knew you'd agree! 😘
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-rose-500 flex items-center justify-center z-50 p-4">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-white/20 fill-current animate-float"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {showQuestion && (
        <div
          className="question-card absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{
            top: questionPosition.top,
            left: questionPosition.left,
          }}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl max-w-[280px] sm:max-w-sm md:max-w-md mx-4 border-2 sm:border-4 border-pink-200">
            <div className="text-center mb-6">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-500 fill-current animate-pulse mx-auto mb-3 sm:mb-4" />
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight px-1 sm:px-2">
                {getQuestionText()}
              </h2>
              {attemptCount > 2 && (
                <p className="text-xs text-pink-600 mb-3 sm:mb-4 animate-bounce px-1 sm:px-2">
                  You can't escape this question! 😏
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center px-2 sm:px-4">
              <button
                onClick={handleYes}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm md:text-base"
              >
                Yes! 💕
              </button>
              <button
                onClick={handleNo}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm md:text-base"
              >
                No 😤
              </button>
            </div>
            
            {attemptCount > 0 && (
              <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                Attempts to say no: {attemptCount} 😂
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;