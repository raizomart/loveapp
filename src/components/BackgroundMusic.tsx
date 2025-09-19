import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;

    // Auto-play when component mounts (after user interaction)
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Auto-play prevented by browser');
      }
    };

    // Small delay to ensure component is mounted
    const timer = setTimeout(playAudio, 1000);

    return () => clearTimeout(timer);
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.volume = newVolume;
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundjay.com/misc/sounds/perfect-ed-sheeran.mp3"
      >
        <source src="https://www.soundjay.com/misc/sounds/perfect-ed-sheeran.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music control panel */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3 border border-pink-200">
          <button
            onClick={togglePlay}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-1.5 sm:p-2 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md"
          >
            {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
          >
            {isMuted ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-12 sm:w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          
          <div className="hidden sm:block text-xs text-gray-500 font-medium whitespace-nowrap">
            Perfect
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;