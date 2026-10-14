import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, MapPin, Compass } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthday';

export const OurStoryTimeline: React.FC = () => {
  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Journey Through Time</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
          Every Love Story Has Its Magic
        </h2>

        <p className="text-pink-200/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
          “And somehow, my favourite story became ours.”
        </p>
      </div>

      {/* Central Glowing Timeline Line */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-pink-500 via-rose-400 to-amber-300 -translate-x-1/2 shadow-[0_0_15px_rgba(244,114,182,0.8)]" />

        {/* Milestone Cards */}
        <div className="space-y-16 sm:space-y-24">
          {BIRTHDAY_DATA.timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Dot / Heart Icon */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 via-rose-400 to-amber-300 p-[2px] shadow-[0_0_20px_rgba(244,114,182,0.6)]">
                  <div className="w-full h-full bg-[#1b091f] rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-300 fill-pink-400/40" />
                  </div>
                </div>

                {/* Milestone Card Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className="group relative rounded-3xl p-6 sm:p-7 bg-white/5 backdrop-blur-xl border border-pink-500/20 hover:border-pink-400/50 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(244,114,182,0.2)]">
                    {/* Glowing highlight corner */}
                    <div className="absolute -top-1 -right-1 w-20 h-20 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />

                    {/* Milestone Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-5 shadow-lg border border-pink-200/20">
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/30 text-[11px] font-medium text-pink-200 flex items-center space-x-1.5">
                        <Calendar className="w-3 h-3 text-amber-300" />
                        <span>{item.year}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-pink-500/80 backdrop-blur-sm text-[10px] font-semibold text-white tracking-wide uppercase">
                        {item.tag}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-1 group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-script text-xl text-pink-300 mb-3">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-pink-100/80 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
