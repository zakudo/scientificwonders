"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export type StorySlide = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  image: string;
  location?: string;
  tag?: string;
  quote?: string;
  historicalNote?: string;
};

export interface AnimatedHistoricalSequenceProps {
  slides: StorySlide[];
  autoplay?: boolean;
  onOpenLightbox?: (slide: StorySlide) => void;
  className?: string;
}

export function AnimatedHistoricalSequence({
  slides,
  autoplay = false,
  onOpenLightbox,
  className = "",
}: AnimatedHistoricalSequenceProps) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 7000);
      return () => clearInterval(interval);
    }
  }, [autoplay, slides.length]);

  const randomRotateY = (idx: number) => {
    const angles = [-3, 2, -2, 3, -1, 2];
    return angles[idx % angles.length];
  };

  const currentSlide = slides[active];

  return (
    <div
      className={`w-full bg-[#EAE2D2]/80 border border-[#D1C7B4] rounded-sm p-6 sm:p-10 my-8 shadow-sm backdrop-blur-sm relative ${className}`}
    >
      {/* Archival Document Number & Corner Marks */}
      <div className="absolute top-3 left-4 text-[10px] font-mono text-[#5C5851] tracking-widest uppercase">
        ARCHIVE DOC. {active + 1 < 10 ? `0${active + 1}` : active + 1} / {slides.length < 10 ? `0${slides.length}` : slides.length}
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono text-[#6E1F2A] tracking-wider uppercase font-semibold">
        {currentSlide.tag || "DOCUMENT HISTORIQUE"}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Stacked Animated Archival Image Frame */}
        <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] w-full flex items-center justify-center">
          <AnimatePresence>
            {slides.map((slide, index) => (
              <motion.div
                key={slide.image + index}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  z: -100,
                  rotate: randomRotateY(index),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.45,
                  scale: isActive(index) ? 1 : 0.94,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(index),
                  zIndex: isActive(index)
                    ? 20
                    : slides.length + 2 - index,
                  y: isActive(index) ? [0, -15, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  z: 100,
                  rotate: randomRotateY(index),
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <div
                  onClick={() => {
                    if (isActive(index) && onOpenLightbox) {
                      onOpenLightbox(slide);
                    } else {
                      setActive(index);
                    }
                  }}
                  className={`relative w-full h-full rounded-sm overflow-hidden shadow-md cursor-pointer border bg-[#171614] ${
                    isActive(index)
                      ? "border-[#6E1F2A] ring-1 ring-[#6E1F2A]/30"
                      : "border-[#C5BBA7]"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    draggable={false}
                    className="h-full w-full object-cover object-center select-none"
                  />
                  {isActive(index) && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#171614]/95 via-[#171614]/50 to-transparent p-3 text-[11px] font-mono text-[#F2EBDD] flex items-center justify-between">
                      <span>🔍 Cliquer pour agrandir / Click to enlarge</span>
                      <span className="uppercase text-[9px] tracking-wider text-[#A58A55]">
                        {slide.period}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Narrative Content */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <motion.div
            key={active}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[#D1C7B4] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#6E1F2A] text-[#F2EBDD] text-xs font-mono font-bold rounded-xs">
                  {currentSlide.period}
                </span>
                <span className="text-xs font-mono text-[#5C5851] uppercase tracking-wider">
                  {currentSlide.location}
                </span>
              </div>
              <span className="text-xs font-mono text-[#6E1F2A] font-bold">
                0{active + 1} / 0{slides.length}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171614] leading-tight tracking-tight">
              {currentSlide.title}
            </h3>

            <p className="text-xs font-mono text-[#6E1F2A] uppercase tracking-widest font-semibold">
              {currentSlide.subtitle}
            </p>

            <motion.p className="text-sm sm:text-base text-[#5C5851] leading-relaxed font-sans pt-1">
              {currentSlide.description.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(3px)", opacity: 0, y: 3 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.012 * i,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {currentSlide.quote && (
              <div className="bg-[#E5DCC9] border-l-2 border-[#6E1F2A] p-3 rounded-r-xs text-xs text-[#171614] font-serif italic">
                {currentSlide.quote}
              </div>
            )}

            {currentSlide.historicalNote && (
              <div className="bg-[#FAF6EE] p-3 rounded-xs text-[11px] font-mono text-[#5C5851] border border-[#D1C7B4]">
                🏛️ <strong className="text-[#6E1F2A]">Note d'archive:</strong>{" "}
                {currentSlide.historicalNote}
              </div>
            )}
          </motion.div>

          {/* Interactive Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#D1C7B4]">
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-xs transition-all ${
                    active === i
                      ? "w-8 bg-[#6E1F2A]"
                      : "w-2.5 bg-[#C5BBA7] hover:bg-[#5C5851]"
                  }`}
                  title={`Aller au document 0${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 bg-[#FAF6EE] hover:bg-[#E5DCC9] border border-[#C5BBA7] hover:border-[#6E1F2A] rounded-xs text-[#171614] transition-colors group"
                title="Document précédent"
              >
                <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-[#FAF6EE] hover:bg-[#E5DCC9] border border-[#C5BBA7] hover:border-[#6E1F2A] rounded-xs text-[#171614] transition-colors group"
                title="Document suivant"
              >
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
