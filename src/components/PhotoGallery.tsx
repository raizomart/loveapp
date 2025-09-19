import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

// ✅ Import your local images (make sure they’re inside src/components/pictures/)
import photo1 from "./pictures1/picture1.jpg.jpg";
import photo2 from "./pictures1/picture2.jpg.jpg";
import photo3 from "./pictures1/picture3.jpg.jpg";
import photo4 from "./pictures1/picture4.jpg.jpg";
import photo5 from "./pictures1/picture5.jpg.jpg";
import photo6 from "./pictures1/picture6.jpg.jpg";

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = [
    { url: photo1, caption: "Our Photoshoot in Intramuros Sesion" },
    { url: photo2, caption: "Pares Timeee (sana maulit ulit hehe)" },
    { url: photo3, caption: "Sino mas maganda? (Being Tsundere*)" },
    { url: photo4, caption: "Happy to have you two" },
    { url: photo5, caption: "Nag tatago ka ng meet sa bag mo ha" },
    { url: photo6, caption: "I'm just appreciating your heavenly beauty." }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <Camera className="w-12 h-12 text-pink-600 mx-auto" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Scrapbook
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            Captured moments that tell our beautiful story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedPhoto(photo.url)}
            >
              <div className="aspect-square relative min-h-[200px] sm:min-h-[250px]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="font-medium text-xs sm:text-sm leading-relaxed">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative polaroid frames */}
        <div className="hidden sm:block absolute top-10 left-10 transform rotate-12 opacity-20 pointer-events-none">
          <div className="bg-white p-4 shadow-lg rotate-6">
            <div className="w-32 h-32 bg-gray-200"></div>
            <p className="text-center mt-2 font-handwriting">Us ♡</p>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-10 right-10 transform -rotate-6 opacity-20 pointer-events-none">
          <div className="bg-white p-4 shadow-lg -rotate-3">
            <div className="w-28 h-28 bg-gray-200"></div>
            <p className="text-center mt-2 font-handwriting">Forever</p>
          </div>
        </div>
      </div>

      {/* Photo modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-sm sm:max-w-2xl md:max-w-4xl max-h-full">
            <img
              src={selectedPhoto}
              alt="Selected photo"
              className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
