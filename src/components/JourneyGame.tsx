import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Play, RotateCcw, Zap } from 'lucide-react';

const JourneyGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [youPosition, setYouPosition] = useState(50); // Vertical position (0-100)
  const [mePosition, setMePosition] = useState(10); // Horizontal position
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Array<{id: number, x: number, type: string}>>([]);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [showCelebration, setShowCelebration] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const obstacleIdRef = useRef(0);

  // Jump function
  const jump = useCallback(() => {
    if (!gameStarted || gameOver || isJumping) return;
    
    setIsJumping(true);
    setYouPosition(20); // Jump up
    
    setTimeout(() => {
      setYouPosition(50); // Fall down
      setTimeout(() => {
        setIsJumping(false);
      }, 200);
    }, 300);
  }, [gameStarted, gameOver, isJumping]);

  // Handle keyboard and touch events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      jump();
    };

    if (gameStarted && !gameOver) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('touchstart', handleTouch);
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('click', handleClick);
    };
  }, [gameStarted, gameOver, jump]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      // Move obstacles
      setObstacles(prev => prev.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - gameSpeed
      })).filter(obstacle => obstacle.x > -10));

      // Add new obstacles randomly
      if (Math.random() < 0.02) {
        setObstacles(prev => [...prev, {
          id: obstacleIdRef.current++,
          x: 100,
          type: Math.random() > 0.5 ? '🌳' : '🪨'
        }]);
      }

      // Move "Me" closer gradually
      setMePosition(prev => Math.min(prev + 0.1, 85));

      // Increase score
      setScore(prev => prev + 1);

      // Increase game speed gradually
      setGameSpeed(prev => Math.min(prev + 0.001, 4));

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameOver, gameSpeed]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const checkCollisions = () => {
      obstacles.forEach(obstacle => {
        // Check if obstacle is near "You" position (around 20% from left)
        if (obstacle.x >= 18 && obstacle.x <= 25 && youPosition > 40) {
          // Collision detected!
          setGameOver(true);
          setGameStarted(false);
        }
      });

      // Check if "Me" caught up to "You"
      if (mePosition >= 80) {
        setGameOver(true);
        setGameStarted(false);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    };

    checkCollisions();
  }, [obstacles, youPosition, mePosition, gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setYouPosition(50);
    setMePosition(10);
    setObstacles([]);
    setGameSpeed(2);
    setIsJumping(false);
    setShowCelebration(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setYouPosition(50);
    setMePosition(10);
    setObstacles([]);
    setGameSpeed(2);
    setIsJumping(false);
    setShowCelebration(false);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Start Our Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4 mb-4">
            Help "You" jump over obstacles while "Me" tries to catch up! 💕
          </p>
          <div className="text-sm sm:text-base text-gray-500">
            <span className="hidden sm:inline">Press SPACEBAR to jump</span>
            <span className="sm:hidden">Tap anywhere to jump</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={gameRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-pink-200 relative overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
          >
            {/* Game Area */}
            <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-r from-blue-200 via-green-200 to-blue-300 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 overflow-hidden">
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-green-400 to-green-300"></div>
              
              {/* Clouds */}
              <div className="absolute top-4 left-10 text-white text-2xl sm:text-3xl opacity-70">☁️</div>
              <div className="absolute top-8 right-20 text-white text-xl sm:text-2xl opacity-60">☁️</div>
              <div className="absolute top-6 left-1/2 text-white text-2xl opacity-50">☁️</div>

              {/* Score */}
              {gameStarted && (
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-bold text-gray-800">
                  Score: {score}
                </div>
              )}

              {/* "You" Character */}
              <div 
                className="absolute transition-all duration-300 ease-out"
                style={{ 
                  left: '20%', 
                  bottom: `${youPosition}%`,
                  transform: isJumping ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg relative">
                  You 💖
                  {isJumping && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs">✨</div>
                  )}
                </div>
              </div>

              {/* "Me" Character */}
              <div 
                className="absolute bottom-[50%] transition-all duration-200 ease-out"
                style={{ left: `${mePosition}%` }}
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  Me 💜
                </div>
              </div>

              {/* Obstacles */}
              {obstacles.map(obstacle => (
                <div
                  key={obstacle.id}
                  className="absolute bottom-[50%] text-2xl sm:text-3xl transition-all duration-100"
                  style={{ left: `${obstacle.x}%` }}
                >
                  {obstacle.type}
                </div>
              ))}

              {/* Ground decorations */}
              <div className="absolute bottom-2 left-[10%] text-lg sm:text-xl">🌸</div>
              <div className="absolute bottom-3 left-[30%] text-base sm:text-lg">🌺</div>
              <div className="absolute bottom-2 left-[50%] text-lg sm:text-xl">🌼</div>
              <div className="absolute bottom-3 left-[70%] text-base sm:text-lg">🌻</div>
              <div className="absolute bottom-2 left-[90%] text-lg sm:text-xl">🌷</div>
            </div>

            {/* Game Controls */}
            <div className="text-center space-y-4 sm:space-y-6">
              {!gameStarted && !gameOver && (
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Start Running Together!</span>
                </button>
              )}

              {gameStarted && !gameOver && (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg text-gray-700 font-medium animate-pulse">
                    Jump over obstacles! I'm coming for you! 🏃‍♀️🏃‍♂️
                  </p>
                  <div className="flex justify-center space-x-4 sm:space-x-6 text-sm sm:text-base">
                    <div className="text-pink-600 font-semibold flex items-center space-x-1">
                      <Zap className="w-4 h-4" />
                      <span>Speed: {gameSpeed.toFixed(1)}x</span>
                    </div>
                    <div className="text-purple-600 font-semibold">
                      Distance: {Math.round((mePosition - 10) * 10)}m
                    </div>
                  </div>
                </div>
              )}

              {gameOver && !showCelebration && (
                <div className="space-y-4 sm:space-y-6">
                  {mePosition >= 80 ? (
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text animate-bounce">
                      I Caught You! 🎉💕
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text">
                      Oops! Try Again! 💔
                    </div>
                  )}
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto px-4">
                    {mePosition >= 80 
                      ? "No matter how far you run, I'll always catch up to you because we're meant to be together! 💕"
                      : `You scored ${score} points! Don't worry, I'll keep chasing you until we're together! 😘`
                    }
                  </p>
                  <button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Play Again!</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 text-center max-w-md mx-4 animate-fadeIn">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 animate-bounce">
                🎉💕🎉
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-3 sm:mb-4">
                Caught You!
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                No matter where you go, I'll always find my way to you! That's what true love is all about! 💖
              </p>
            </div>
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute top-10 left-4 sm:left-10 text-2xl sm:text-4xl text-pink-300 animate-bounce">🏃‍♀️</div>
        <div className="absolute top-20 right-4 sm:right-16 text-2xl sm:text-3xl text-purple-300 animate-pulse">🏃‍♂️</div>
        <div className="absolute bottom-20 left-4 sm:left-20 text-xl sm:text-2xl text-rose-300 animate-bounce" style={{animationDelay: '1s'}}>💨</div>
        <div className="absolute bottom-10 right-4 sm:right-10 text-2xl sm:text-4xl text-pink-400 animate-pulse" style={{animationDelay: '2s'}}>❤️</div>
      </div>
    </section>
  );
};

export default JourneyGame;