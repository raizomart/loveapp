import React, { useState } from 'react'; 
import { Calendar, MapPin, Heart, Star, Camera, Gift } from 'lucide-react';

// ✅ Import your local images from src/components/pictures
import gradImg from "./pictures/graduation.jpg.jpg";
import galaImg from "./pictures/gala.jpg.jpg";
import rideImg from "./pictures/ride.jpg.jpg";
import pictureImg from "./pictures/picture.jpg.jpg";
import christmasImg from "./pictures/christmas.jpg.jpg";

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  image: string;
}

const MemoryTimeline: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const memories: Memory[] = [
    {
      id: 1,
      date: "October 08, 2023",
      title: "The Day you Graduated",
      description: "I'm just so amazed at you, I felt so happy for you",
      details: "I remember we had a pictorial before your graduation starts, I went inside for a moment to see you.",
      icon: <Heart className="w-6 h-6" />,
      image: gradImg
    },
    {
      id: 2,
      date: "October 08, 2023",
      title: "Our Memorable Gala",
      description: "Our memorable Gala together, full of butterflies and joy",
      details: "We went to the famous Intramuros, walking through its golden streets at sunset. We enjoyed the views together in Intramuros and even had a little pictorial.",
      icon: <Gift className="w-6 h-6" />,
      image: galaImg
    },
    {
      id: 3,
      date: "October 08, 2023",
      title: "Our First Ride Together with Friends ",
      description: "Adventure, laughter, and creating memories with you",
      details: "We went for a ride, letting the breeze set the mood for our little adventure. The nature trip was refreshing, surrounded by greenery that made everything feel calm and free. We laughed, took pictures, and simply enjoyed being in the moment. The day ended perfectly with swimming, splashing around (We nearly drown to the water), and making memories we’ll never forget.",
      icon: <MapPin className="w-6 h-6" />,
      image: rideImg
    },
    {
      id: 4,
      date: "July 07, 2025",
      title: "The Day before I leave the Country",
      description: "Went to Picture Picture at the SM",
      details: "We planned together that we're getting a picture for us with our Mother",
      icon: <Star className="w-6 h-6" />,
      image: pictureImg
    },
    {
      id: 5,
      date: "December 24, 2024",
      title: "First Christmas Together",
      description: "Magic, warmth, and the best gift of all - us",
      details: "I was a bit nervous because its my first time sleeping to another house but it was the best Christmast eve ever.",
      icon: <Camera className="w-6 h-6" />,
      image: christmasImg
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-purple-50 to-pink-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Memory Timeline
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            Every moment with you is a treasure worth remembering
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 to-purple-300 h-full"></div>

          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`relative flex items-center mb-12 sm:mb-16 ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                <div
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-pink-100"
                  onClick={() => setSelectedMemory(memory)}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 text-white mr-3">
                      {memory.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-800">{memory.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {memory.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{memory.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-2 sm:border-4 border-white shadow-lg z-10"></div>

              <div className="hidden sm:block sm:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory popup */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-sm sm:max-w-2xl w-full mx-4 overflow-hidden shadow-2xl">
            <div className="relative">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors text-lg sm:text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedMemory.title}</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {selectedMemory.date}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">{selectedMemory.details}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryTimeline;
