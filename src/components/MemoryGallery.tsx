import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Sparkles, Image as ImageIcon, Info, Calendar } from 'lucide-react';
import { PhotoItem, BIRTHDAY_DATA } from '../data/birthday';
import { PhotoLightbox } from './PhotoLightbox';

interface MemoryGalleryProps {
  onPhotoCountChange?: (count: number) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    // Check if user has uploaded photos saved in localStorage
    try {
      const saved = localStorage.getItem('baby_birthday_custom_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...BIRTHDAY_DATA.photos];
      }
    } catch {
      // fallback
    }
    return BIRTHDAY_DATA.photos;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // File input ref for uploading photos
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleOpenPhoto = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newPhoto: PhotoItem = {
          id: `custom-photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          url: dataUrl,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          caption: "A newly added treasure in our love story ♡",
          date: "Recently Added",
          category: 'romantic',
          isReal: true,
        };

        setPhotos((prev) => {
          const updated = [newPhoto, ...prev];
          try {
            const customOnly = updated.filter((p) => p.id.startsWith('custom-photo-'));
            localStorage.setItem('baby_birthday_custom_photos', JSON.stringify(customOnly));
          } catch {
            // LocalStorage quota may be reached for huge images
          }
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    setIsUploadModalOpen(false);
  };

  return (
    <section id="memories" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Photo Gallery</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
          Our Beautiful Journey
        </h2>

        <p className="text-pink-200/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
          “A thousand little moments, one beautiful story, and my favourite person in every chapter.”
        </p>

        {/* Category Filter Pills & Upload Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: `All Moments (${photos.length})` },
            { id: 'romantic', label: 'Romantic' },
            { id: 'milestone', label: 'Milestones' },
            { id: 'celebration', label: 'Celebrations' },
            { id: 'candid', label: 'Candid Smiles' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/25 scale-105'
                  : 'bg-white/5 border border-pink-500/15 text-pink-200/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Direct Upload Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium hover:bg-amber-400/25 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photos</span>
          </button>
        </div>
      </div>

      {/* 3D Polaroid Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => {
          // Subtle natural rotation for playful 3D polaroid scatter effect
          const rotateDeg = (index % 5) * 1.5 - 3;

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
              whileHover={{
                scale: 1.04,
                rotate: 0,
                zIndex: 20,
                boxShadow: '0 25px 45px rgba(244, 114, 182, 0.35)',
              }}
              style={{ rotate: `${rotateDeg}deg` }}
              onClick={() => handleOpenPhoto(photo)}
              className="cursor-pointer group relative bg-[#fffdf9] p-3 sm:p-4 rounded-2xl shadow-xl transition-all duration-300 border border-pink-200/40 text-gray-800"
            >
              {/* Cute Washi Tape / Gold Pin Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-pink-300/40 backdrop-blur-sm rounded-sm border border-pink-200/50 rotate-[-2deg] z-10 shadow-sm" />

              {/* Photo Image Aspect Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Romantic gradient vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-medium flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                    <span>View photo</span>
                  </span>
                </div>

                {/* Real photo badge */}
                {photo.isReal && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-pink-200 text-[10px] font-medium border border-pink-400/20">
                    Real ♡
                  </span>
                )}
              </div>

              {/* Polaroid Handwritten Caption Area */}
              <div className="mt-3.5 px-1 pb-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-semibold text-gray-800 tracking-tight group-hover:text-pink-600 transition-colors">
                    {photo.title}
                  </h3>
                  {photo.date && (
                    <span className="text-[11px] text-gray-500 font-sans flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-pink-400" />
                      <span>{photo.date}</span>
                    </span>
                  )}
                </div>
                <p className="font-script text-lg text-pink-700/90 leading-tight mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upload & Management Helper Drawer/Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-[#1c0c22] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="font-serif text-2xl font-medium text-pink-100 mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Add Photos of Baby & Us</span>
            </h3>
            <p className="text-sm text-pink-200/70 font-light mb-6">
              You can instantly upload photos directly from your computer or phone to appear in this gallery right now.
            </p>

            {/* Drop Zone / Upload Button */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-pink-400/40 hover:border-pink-400 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-pink-500/5 hover:bg-pink-500/10 mb-6 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <ImageIcon className="w-10 h-10 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-base text-pink-100 font-medium">Click to select photos</p>
              <p className="text-xs text-pink-300/60 mt-1">Supports JPG, PNG, WEBP</p>
            </div>

            {/* Permanent Storage Note */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-pink-500/15 text-xs text-pink-200/80 mb-6 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-pink-100">Permanent Folder Instructions:</p>
                <p className="text-pink-300/70 mt-0.5">
                  You can also place high-resolution photos into <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-200">public/photos/</code> and register their names in <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-200">src/data/birthday.ts</code>.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-pink-200 text-sm font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Component */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={filteredPhotos}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />
    </section>
  );
};
