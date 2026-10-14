import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, ZoomIn, ZoomOut } from 'lucide-react';
import { PhotoItem } from '../data/birthday';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photo, photos]);

  if (!isOpen || !photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
    setIsZoomed(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext(); // swipe left -> next
    } else if (diff < -50) {
      handlePrev(); // swipe right -> prev
    }
    setTouchStartX(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-2 sm:p-6"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 transition-all hover:scale-110"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-pink-500/40 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-pink-500/40 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Lightbox Card Container */}
        <div
          className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center justify-center p-2 sm:p-4 rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Photo Frame */}
          <div className="relative overflow-hidden rounded-2xl max-h-[72vh] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-pink-500/30 bg-black/40">
            <motion.img
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.45 : 1.0 }}
              transition={{ duration: 0.3 }}
              src={photo.url}
              alt={photo.title}
              className={`max-h-[70vh] w-auto max-w-full object-contain cursor-pointer transition-transform duration-300 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Zoom Toggle Pill */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/20"
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
          </div>

          {/* Photo Details & Caption */}
          <div className="w-full mt-4 px-3 sm:px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-pink-500/20 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-pink-100">
                  {photo.title}
                </h3>
                {photo.date && (
                  <span className="inline-flex items-center space-x-1 text-xs text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    <Calendar className="w-3 h-3" />
                    <span>{photo.date}</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-pink-200/80 mt-1 max-w-2xl font-light">
                {photo.caption}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0">
              <span className="text-xs text-pink-300/60 font-mono">
                {currentIndex + 1} / {photos.length}
              </span>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full border transition-all ${
                  isLiked
                    ? 'bg-pink-500 border-pink-400 text-white scale-110 shadow-[0_0_15px_rgba(236,72,153,0.6)]'
                    : 'bg-white/5 border-pink-500/20 text-pink-200 hover:bg-white/10'
                }`}
                title="Heart this memory"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
